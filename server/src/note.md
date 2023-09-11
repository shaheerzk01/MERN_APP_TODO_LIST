CRUD => CREATE READ UPDATE DELETE

ROUTES
/ => read all the notes/tasks
/ => create (post) => create a notes/tasks
/:uniqueId => read (get) => send the note related to this uniqueId
/:uniqueId => update (put/post/patch) => update the note related to this uniqueId
/:uniqueId => delete (delete) => delete the note related to this uniqueId

HTTP methods

PUT = use to update data on the server. This method is used to update an existing resource on the server

PATCH = same like PUT but to update partially

GET = use to fetch data from the server without modifying any resources

POST = use to send data to the server. This method is typically used to submit information or to create new document on the server

DELETE = use to delete document from the server

