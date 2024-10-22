document.addEventListener('DOMContentLoaded', () => {
    let simplemde;

    const addButton = document.getElementById('add-button');
    const editorContainer = document.getElementById('editor-container');

    addButton.addEventListener('click', () => {
        if (!simplemde) {
            simplemde = new SimpleMDE({ element: document.getElementById("markdown-editor") });
        }
        editorContainer.style.display = (editorContainer.style.display === 'none') ? 'block' : 'none';
    });

    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', () => {
        const markdownContent = simplemde.value();
        console.log("Saved Markdown Content: ", markdownContent);
        alert("Content saved!");
    });

    // Fetch knowledge base data from API using POST request
    function loadKnowledgeBase() {
        fetch('https://knowledge.abhinavkm.com/load_knowledge_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(data => displayKnowledgeBase(data.DevOpsTools)) // Adjust according to response structure
        .catch(error => console.error('Error loading knowledge base:', error));
    }

    // Generate the knowledge base structure
    function displayKnowledgeBase(data) {
        const baseContainer = document.getElementById('knowledge-base');
        const ul = document.createElement('ul');
        baseContainer.appendChild(ul);

        data.forEach(category => {
            const categoryLi = createExpandableItem(category.name, 'category', category.description);
            ul.appendChild(categoryLi);

            const examplesUl = document.createElement('ul');
            examplesUl.classList.add('collapsible');

            category.examples.forEach(example => {
                const exampleLi = createExpandableItem(example.title, 'example', example.code);
                examplesUl.appendChild(exampleLi);
            });

            categoryLi.appendChild(examplesUl);
            categoryLi.querySelector('.expander').addEventListener('click', () => {
                toggleVisibility(examplesUl);
                toggleDescription(categoryLi, category.description); 
            });
        });
    }

    // Create expandable item
    function createExpandableItem(name, type, content = null) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.classList.add('expander');

        const icon = document.createElement('i');
        icon.classList.add(type === 'category' ? 'fas' : 'far', 'fa-folder');
        div.appendChild(icon);

        const span = document.createElement('span');
        span.textContent = name;
        div.appendChild(span);

        li.appendChild(div);

        if (type === 'category') {
            const descriptionDiv = document.createElement('div');
            descriptionDiv.classList.add('description');
            descriptionDiv.style.display = 'none';
            descriptionDiv.textContent = content;
            li.appendChild(descriptionDiv);
        } else if (type === 'example') {
            div.addEventListener('click', () => showModal(name, content));
        }

        return li;
    }

    function toggleVisibility(element) {
        element.classList.toggle('visible');
    }

    function toggleDescription(li, description) {
        const descriptionDiv = li.querySelector('.description');
        descriptionDiv.style.display = descriptionDiv.style.display === 'none' ? 'block' : 'none';
    }

    function showModal(title, code) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
    
        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;';
        closeButton.onclick = () => modal.remove();
    
        // We'll remove the title here since you want to ignore it
        //const modalTitle = document.createElement('h2');
        //modalTitle.textContent = title;
    
        const pre = document.createElement('pre');
        pre.innerHTML = marked(code); // Render the code from markdown
    
        // Create the "Copy" button
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy Code';
        copyButton.classList.add('copy-button');
        copyButton.onclick = () => {
            copyToClipboard(pre.innerText);
            alert('Code copied to clipboard!');
        };
    
        // Append all the elements
        modalContent.appendChild(closeButton);
        //modalContent.appendChild(modalTitle); // Skip the title
        modalContent.appendChild(copyButton);
        modalContent.appendChild(pre);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }   
    
    // Load the knowledge base data when the page loads
    loadKnowledgeBase();
});
