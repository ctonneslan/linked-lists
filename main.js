class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.headNode = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.headNode) {
      this.headNode = newNode;
      return;
    }
    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    current.nextNode = newNode;
  }

  prepend(value) {
    const newNode = new Node(value, this.headNode);
    this.headNode = newNode;
  }

  size() {
    let count = 0;
    let current = this.headNode;
    while (current) {
      count++;
      current = current.nextNode;
    }
    return count;
  }

  head() {
    return this.headNode;
  }

  tail() {
    let current = this.headNode;
    if (!current) return null;
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current;
  }

  at(index) {
    let current = this.headNode;
    let count = 0;
    while (current) {
      if (count === index) return current;
      current = current.nextNode;
      count++;
    }
    return null;
  }

  pop() {
    if (!this.headNode) return;
    if (!this.headNode.nextNode) {
      this.headNode = null;
      return;
    }
    let current = this.headNode;
    while (current.nextNode.nextNode) {
      current = current.nextNode;
    }
    current.nextNode = null;
  }

  contains(value) {
    let current = this.headNode;
    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  }

  find(value) {
    let current = this.headNode;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    let str = "";
    let current = this.headNode;
    while (current) {
      str += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    return str + "null";
  }

  insertAt(value, index) {
    if (index === 0) return this.prepend(value);
    const prev = this.at(index - 1);
    if (!prev) return;
    prev.nextNode = new Node(value, prev.nextNode);
  }

  removeAt(index) {
    if (index === 0) {
      this.headNode = this.headNode?.nextNode || null;
      return;
    }
    const prev = this.at(index - 1);
    if (!prev || !prev.nextNode) return;
    prev.nextNode = prev.nextNode.nextNode;
  }
}

const list = new LinkedList();
const listDisplay = document.getElementById("listDisplay");

function updateDisplay() {
  listDisplay.innerText = list.toString();
}

function addNode(action) {
  const value = document.getElementById("value").value;
  const index = parseInt(document.getElementById("index").value);
  if (!value) return;

  if (action === "append") list.append(value);
  if (action === "prepend") list.prepend(value);
  if (action === "insert") list.insertAt(value, index);

  updateDisplay();
}

function removeNode() {
  const index = parseInt(document.getElementById("index").value);
  if (!isNaN(index)) list.removeAt(index);
  updateDisplay();
}
