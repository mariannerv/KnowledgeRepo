// Function to fetch JSON data from the root directory with logging
async function loadData() {
  console.log("Starting to load data...");

  try {
    // Fetch the JSON file from the root directory
    const response = await fetch('/knowledge_base_data.json');
    
    // Log the response status to check if the file is fetched successfully
    console.log("Fetch response status:", response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON and log the response
    const data = await response.json();
    console.log("Data fetched successfully:", data);

    // Display the data on the page
    displayData(data.DevOpsTools);
  } catch (error) {
    // Log any errors during fetching or parsing
    console.error("Error fetching data:", error);
  }
}

// Function to display the data on the page
function displayData(tools) {
  console.log("Displaying data on the page...");

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

      // Log the example title being added
      console.log("Adding example to UI:", example.title);

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
function showMarkdownWindow(title, content) {
  console.log("Showing content for:", title);

  const markdownContent = document.getElementById('markdownContent');
  const markdown = `## ${title}\n\n${content}`;
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

// Load data on page load and log the loading process
window.onload = function () {
  console.log("Page loaded, starting data fetch...");
  loadData();
};
