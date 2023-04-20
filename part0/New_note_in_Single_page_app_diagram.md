## New note in Single page app diagram


```mermaid
sequenceDiagram






    browser->>server: POST	https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Http response status code 201 Created
    deactivate server
		Note right of browser : browser adds the new note byhimself without a redirect



```

