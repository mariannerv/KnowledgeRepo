// Function to fetch JSON data from the provided URL
async function loadData() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/blacksmithop/8383cbd32b25f6c90f4f2f82178b0b81/raw/7b7d8b7d7a2eeb7f1ed20b0bee4d027f6d1d105a/knowledge_base_data.json');
    const data = await response.json();
    displayData(data.DevOpsTools);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to display the data on the page
function displayData(tools) {
  const directoryTree = document.getElementById('directoryTree');
  directoryTree.innerHTML = ''; // Clear existing content

  tools.forEach(tool => {
    const toolDiv = document.createElement('div');
    toolDiv.classList.add('collection-item');
    toolDiv.innerHTML = `<strong>${tool.name}</strong>`;

    const exampleList = document.createElement('ul');
    exampleList.classList.add('collection');

    tool.examples.forEach(example => {
      const exampleDiv = document.createElement('li');
      exampleDiv.classList.add('collection-item');
      exampleDiv.innerHTML = `
        <a href="#codeWindow" class="modal-trigger">${example.title}</a>
      `;
      
      // Event listener to show code in the code window
      exampleDiv.querySelector('a').addEventListener('click', () => {
        showMarkdownWindow(example.title, example.code);
      });

      exampleList.appendChild(exampleDiv);
    });

    directoryTree.appendChild(toolDiv);
    directoryTree.appendChild(exampleList);
  });
}

// Function to display the markdown content in the modal window
function showMarkdownWindow(title, code) {
  const markdownContent = document.getElementById('markdownContent');
  const markdown = `# ${title}\n\n\`\`\`javascript\n${code}\n\`\`\``;
  const renderedMarkdown = marked(markdown);
  markdownContent.innerHTML = renderedMarkdown; // Set the markdown content

  // Re-run syntax highlighting after rendering the markdown
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block);
  });
}

// Close rich text editor
document.getElementById('editorModal').querySelector('.modal-close').addEventListener('click', function () {
  const editorModal = document.getElementById('editorModal');
  editorModal.style.display = 'none';
});

// Load data on page load
window.onload = loadData;
