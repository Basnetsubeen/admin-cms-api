# admin-cms-api

# admin-cms-client

## APIS

All the api lend points will follow the following patterns `{rootUrl}`/api/v1.

### Admin user api

This api endpoint is resposible for handeling all the admin user record request.

All the Admin endpoints will follow the following patterns `{rooturl}/api/v1/admin-user`

| #   | PATH            | METHOD | PRIVATE | DESCRIPTION                                                                                                                                                                   |
| --- | --------------- | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.  | `/`             | POST   | NO      | Receives new admin data and create new adim in our database. If admin user's email exist, it will return error otherwise it will return success with user info from database. |
| 2.  | `/verify-email` | PATCH  | No      | Receive `email, verification` to verify newly create user action , return success and error accordingly                                                                       |
| 3.  | `/login`        | POST   | No      | Receives `{email, password}` and checks if the user exist for that combination in our database,if it does, it will handle all the login process.                              |
