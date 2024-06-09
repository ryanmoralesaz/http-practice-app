// Example of a test for the /api/items route
test('GET /api/items returns 200 and items list', async () => {
  const response = await request(app).get('/api/items');
  expect(response.statusCode).toBe(200);
  expect(response.body.data).not.toBeNull();
});

test('GET /api/items returns 404 when no items found', async () => {
  // Here you would mock the fetchDataFromDatabase function to return null
  jest.mock('./data-fetching-module', () => ({
    fetchDataFromDatabase: () => null
  }));
  const response = await request(app).get('/api/items');
  expect(response.statusCode).toBe(404);
});