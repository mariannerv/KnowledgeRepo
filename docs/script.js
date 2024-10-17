document.addEventListener('DOMContentLoaded', () => {
    // Gist details
    const gistId = '8383cbd32b25f6c90f4f2f82178b0b81';
    const filename = 'knowledge_base_data.json';

    // Function to handle the gist content
    function DoSomethingWith(content) {
        try {
            const parsedContent = JSON.parse(content); // Parse the content to JSON
            const devOpsTools = parsedContent.DevOpsTools; // Extract DevOpsTools array
            displayKnowledgeBase(devOpsTools); // Display the knowledge base
        } catch (e) {
            console.error('Error parsing JSON content:', e);
        }
    }

    // Fetch the Gist using JSONP
    function fetchGist(gistId, filename) {
        const script = document.createElement('script');
        script.src = `https://api.github.com/gists/${gistId}?callback=handleGistData`;
        document.body.appendChild(script);
    }

    // Handle the JSONP response
    window.handleGistData = function (gistdata) {
        try {
            const content = gistdata.data.files[filename].content; // Extract file content
            DoSomethingWith(content); // Process the content
        } catch (e) {
            console.error('Error handling the Gist data:', e);
        }
    };

    // Load knowledge base data from Gist
    fetchGist(gistId, filename);

    // Recursive function to generate the directory structure
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
                toggleDescription(categoryLi, category.description); // Show/hide description
            });
        });
    }

    // Create an expandable list item
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
            div.addEventListener('click', () => {
                showModal(name, content); // Open modal with content when example is clicked
            });
        }

        return li;
    }

    // Toggle visibility of collapsible elements
    function toggleVisibility(element) {
        element.classList.toggle('visible');
    }

    // Toggle visibility of the description
    function toggleDescription(li, description) {
        const descriptionDiv = li.querySelector('.description');
        if (descriptionDiv) {
            descriptionDiv.style.display = descriptionDiv.style.display === 'none' ? 'block' : 'none';
        }
    }

    // Show modal for example content
    function showModal(title, code) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;';
        closeButton.onclick = () => modal.remove();

        const modalTitle = document.createElement('h2');
        modalTitle.textContent = title;

        const pre = document.createElement('div');
        pre.innerHTML = marked(code); // Use marked.js to parse and render markdown

        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(pre);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }
});
