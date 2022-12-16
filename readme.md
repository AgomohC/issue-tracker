# Issue Tracker

[femto-issue-tracker](https://broadleaf-excessive-judge.glitch.me/) is a REST API that implements CRUD. It keeps tracks of issues in a project. This project idea was gotten from [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker).

---

### Resources

There are 4 main resources

- Create an issue <https://broadleaf-excessive-judge.glitch.me/api/issues/>:projectName/
- Get all issues <https://broadleaf-excessive-judge.glitch.me/api/issues/>:projectName/
- Update an issue <https://broadleaf-excessive-judge.glitch.me/api/issues/>:projectName/
- Delete an issue <https://broadleaf-excessive-judge.glitch.me/api/issues/>:projectName/

### Create an issue

This is done by making a post request to <https://broadleaf-excessive-judge.glitch.me/api/issues/>:projectName/ with the name of the project replacing :projectName. The request body can hold issue_title, issue_text, created_by, assigned_to, status_text and open fields. Issue_title, issue_text and created_by fields must always be present in the request body else a 400 error is returned. If open field is absent from the request body it is set to a default value of true.

```js
fetch("https://broadleaf-excessive-judge.glitch.me/api/issues/sample-project/", {
  method: "POST",
  body: JSON.stringify({
    issue_title: "sample issue",
    issue_text: "sample issue text",
    created_by: "sample issue creator",
    assigned_to: "sample issue solver",
    status_text: "sample issue status",
    open: true,
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* will return
{
    "newIssue": {
        "issue_title": "sample issue",
        "issue_text": "sample issue text",
        "created_by": "sample issue creator",
        "open": true,
        "assigned_to": "sample issue solver",
        "status_text": "sample issue status",
        "project_name": "sample project",
        "_id": "sample issue id",
        "createdAt": "2021-10-30T20:42:36.420Z",
        "updatedAt": "2021-10-30T20:42:36.420Z",
        "__v": 0
    }
}

If any of all of the issue_title, issue_text or created_by fields are missing from the request body, a 400 error is returned with the following json object
{
    "error": "required field(s) missing"
}
*/
```

### Get all issues

This is done by making a get request to <https://broadleaf-excessive-judge.glitch.me/api/issues/>:projectName/ with the name of the project replacing :projectName. The request query can hold issue_title, issue_text, created_by, assigned_to, status_text and open fields. This is used to filter the result. If all these fields are absent, all issues within the project :projectName are returned. If there are no projects matching :projectName, a 404 error is returned.

```js
fetch(
  "https://broadleaf-excessive-judge.glitch.me/api/issues/sample-project?issue_title=sample issue&issue_text=sample issue text&created_by=sample issue creator&assigned_to=sample issue solver&status_text=sample issue status open: true"
)
  .then((res) => res.json())
  .then((json) => console.log(json));

/* will return
{
  "nbHits": number of hits that match the provided parameters,
  "existingIssues": [
      {
       "_id": "sample issue _id",
       "issue_title": "sample issue title",
       "issue_text": "sample issue text",          "created_by": "sample issue creator",
       "open": true,
       "assigned_to": "sample issue solver",
       "status_text": "sample issue status",
       "project_name": "sample-project",
       "createdAt": "2021-10-30T20:42:36.420Z",
       "updatedAt": "2021-10-30T20:42:36.420Z",
       "__v": 0
      }
   ]
}

If not existing issue match the required parameters, a 404 error is returned with the following json object
{
    "error": "Project :projectName has no existing issues which match the parameters provided"
}
*/
```

### Update an issue

This is done by making a put request to <https://broadleaf-excessive-judge.glitch.me/api/issues/>:projectName/ with the name of the project replacing :projectName. The request body must hold the \_id of the issue to be updated. If the \_id is absent from the request body, a 400 error is returned. One of the issue_title, issue_text, created_by, assigned_to, status_text and open fields must also be present. If they are all absent a 400 error is returned. If there is no issue with the \_id that was passed in, a 404 error is returned.

```js
fetch("https://broadleaf-excessive-judge.glitch.me/api/issues/sample-project/", {
  method: "PUT",
  body: JSON.stringify({
    _id: "sample issue _id",
    issue_title: "sample issue update",
    issue_text: "sample issue text update",
    created_by: "sample issue creator update",
    assigned_to: "sample issue solver update",
    status_text: "sample issue status update",
    open: false,
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/*
  will return
{
  "result": "successfully updated, _id: sample issue _id"
}

If no issue matches the provided _id a 404 error is returned with the following json object
{
  "error": "No issue with _id: sample issue _id"
}

If the _id is absent from the request body, a 400 error is returned with the following json object
{
  "error": "missing _id"
}

If there are no request query parameters, a 400 error is returned with the following json object
{
  "error": "no update field(s) sent, _id: sample issue _id"
}
  */
```

### Delete an issue

This is done by making a delete request to <https://broadleaf-excessive-judge.glitch.me/api/issues/>:projectName/ with the name of the project replacing :projectName. The request body must hold the \_id of the issue to be deleted. If the \_id is absent from the request body, a 400 error is returned. If there is no issue with the \_id that was passed in, a 404 error is returned.

```js
fetch("https://broadleaf-excessive-judge.glitch.me/api/issues/sample-project/", {
  method: "DELETE",
  body: JSON.stringify({
    _id: "sample issue _id",
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/*
will return
{
  "result": "successfully deleted, _id: sample issue _id"
}

If the _id is absent form the request body, a 400 error is returned with the following json object
{
  "error": "missing _id"
}

If no issue matches the _id passed in, a 404 error is returned with the following json object
{
  "error": "No issue with _id: sample issue _id"
}
*/
```

### Feedback!!

I'd love your feedback on the API. You can reach me via [email](mailto:chinaemerema@gmail.com) or give me a shout out on [twitter](https://twitter.com/femto_ace?t=nk6ylNm1Zp2l0yiJkCKFeA&s=09)
