## flag meanings
`-X` is the HTTP method
`-H` is the HTTP Header
`-d` is the request body 'stands for data'

POST:
`curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"username": "john", "data": {"age": 30}}'
`

PUT:
`curl -X PUT http://localhost:3000/users/john -H "Content-Type: application/json" -d '{"data": {"age": 31}}'
`

DELETE:
`curl -X DELETE http://localhost:3000/users/john
`

PATCH:
`curl -X PATCH http://localhost:3000/users/john -H "Content-Type: application/json" -d '{"data": {"age": 32}}'
`