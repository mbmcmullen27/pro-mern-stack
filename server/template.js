export default function template(body, initialState) {
    return `<!DOCTYPE HTML>
    <html>

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pro MERN Glub</title>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
        <style>
        .card-header {text-align: left; display: block; width: 100%; cursor: pointer;}
        #user-dropdown:after{
            display:none;
        }
        </style>
    </head>

    <body>
        <div id="contents">${body}</div>    <!-- this is where our component will appear -->
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
        <base href="http://localhost:8000/"/>
    </body>

    </html>
    `;
}
