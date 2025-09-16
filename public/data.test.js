const fetchData = require('./data');

// fetchData.test.js

// const fetchData = require('./fetchData');

describe('fetchData', () => {
  beforeEach(() => {
    // Setup a mock DOM
    document.body.innerHTML = `<div id="items-container"></div>`;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders data items into the container', async () => {
    // Mock fetch to return some fake data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
          ]),
      })
    );

    await fetchData();

    const container = document.getElementById('items-container');
    const items = container.querySelectorAll('.item');

    expect(items.length).toBe(2);
    expect(items[0].innerHTML).toContain('Alice');
    expect(items[1].innerHTML).toContain('Bob');
  });

  it('renders "No data found." when data is empty', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    await fetchData();

    const container = document.getElementById('items-container');
    expect(container.innerHTML).toContain('No data found.');
  });

  it('renders error message on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.reject('Network error'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await fetchData();

    const container = document.getElementById('items-container');
    expect(container.innerHTML).toContain('Error loading data.');
    consoleErrorSpy.mockRestore();
  });
});
