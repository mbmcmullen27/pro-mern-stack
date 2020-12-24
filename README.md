Glub (Pro MERN stack)
====================

## Chapter 6: Using Mongo db

* The MongoClient needs {useUnifiedTopology:true} when connecting 
 with a version >= 3.1.0 
* we are using 4.4.1

[Mongo startup Warnings]
db.enableFreeMonitoring() -- this could be neat once we have more in the database and probably not for the issues app

## Chapter 7: Modularization and Webpack

* web pack version dated/deprecated from this book also
* got a prompt to install webpack cli on running this command from page 118

> node_modules/.bin/webpack static/App.js static/app.bundle.js

***We get this error***

    [webpack-cli] Compilation finished
    assets by status 0 bytes [cached] 1 asset

    ERROR in main
    Module not found: Error: Can't resolve 'static/App.js' in '/home/fishbot/mern-stack/glub'

    ERROR in main
    Module not found: Error: Can't resolve 'static/app.bundle.js' in '/home/fishbot/mern-stack/glub'

Adding ./ to static/App.js path seemed to make that resolve but output file param may be different with webpack-cli than it is in the version from the book (just like mongo was)

***Yup needed the -o flag***

    [fishbot@archbox glub]$ node_modules/.bin/webpack ./static/App.js -o static/app.bundle.js
    [webpack-cli] Compilation finished
    asset main.js 4.67 KiB [emitted] [minimized] (name: main)
    ./static/App.js 10.2 KiB [built] [code generated]
    webpack 5.4.0 compiled successfully in 420 ms
    [fishbot@archbox glub]$ 

* still having problems, may just finish the chapter and see if webpack just handles whatever is going when i set up the config

### 11/9/2020
* tried to finish chapter, I think babel loader and webpack are both out of date.
* pulled webpack.config.js from the github for the second addition of the book and it needed to updated babel-loader like this:
> npm install babel-loader@7

Looks like compilation finishes, but getting a syntax error now?

    [fishbot@archbox glub]$ node_modules/.bin/webpack
    [webpack-cli] Compilation finished
    assets by status 562 bytes [cached] 1 asset
    ./src/App.jsx 39 bytes [built] [code generated] [1 error]

    ERROR in ./src/App.jsx
    Module build failed (from ./node_modules/babel-loader/lib/index.js):
    SyntaxError: Unexpected token (8:12)

        6 |     render(){
        7 |         return (
    >   8 |             <div>Placeholder for the Issue Filter.</div>
          |             ^
        9 |         )
        10|     }
        11| }

### 11/10/20
* fiddling with the versions, unintalling and install the newest version of babel-loader 
* changed webpack.config.js to match more closely to the webpack documentation
* needed @babel/preset-react before it could parse the jsx

**Success??**

    [webpack-cli] Compilation finished
    asset app.bundle.js 8.33 KiB [emitted] [minimized] (name: main)
    orphan modules 15.4 KiB [orphan] 3 modules
    ./src/App.jsx + 3 modules 15.6 KiB [built] [code generated]
    webpack 5.4.0 compiled successfully in 1445 ms

 * yeah success... this is working now
 * at first we were getting a 404 on the request to get app.bundle.js in the browser
 * tried messing with the path in index.html -> didn't work
 * verified webpack.config.js output module is correct for current version of webpack
 * noticed that the initial get to localhost was returning "not modified"
    * opened in an incognitto tab and it worked there
    * cleared cookies/cache opened a clean browser and now it works
```javascript
//changing the compile step to use webpack with babel loader, removed these two scripts
    "compile": "babel src --presets react,es2015 --out-dir static",
    "watch": "babel src --presets react,es2015 --out-dir static -watch",
```
* page displaying blank but is generating the two bundles...

* spent far too long debugging this... forgot to include the vendor libraries bundle in **index.html**
```html
<script src="/vendor.bundle.js"></script>
```

### HMR 11/12/20

* right away getting this trying to run the dev server after installing
> Error: Cannot find module 'webpack-cli/bin/config-yargs'
* I wasn't able to run webpack in the last section this way either if I remember
* the alternative is to run HMR as middleware, the author illustrates both and reverts to webpack-dev-server

> "webpack-dev-server --hot --inline",
changed to
> "webpack serve"
    Yes webpack-cli v4 comes with out of box support of @webpack-cli/serve which means you can use webpack serve to invoke the webpack-dev-server.

* guess you don't need webpack-dev-server, you have webpack-dev-server?
* followed instructions in webpack documentation to run HMR on webpack-dev-server
```json
//package.json
{
  "devDependencies": {

    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^4.5.0",

  }
}
```
* oh this is git now... we will simply commit the changes by chapter/section
* first test that HMR is set and working properly, do I need this bit in [App.jsx](glub/src/App.jsx) still?

```jsx
if (module.hot){
    module.hot.accept();
}
```
From the book:

        "Open up a *new* window or tab in your browser and go to http://localhost:8000/. Note that now you are using the port of the webpack dev server (8000), not the Express web server (3000). If you make a change in any of the client-side code, you will find that while the bundling is in process, the browser is made to wait as opposed to being given a previous version of the bundles."

    ...

        Now, when you refresh the browser, you will see the following in the browser's console log:
---
            [HMR] Waiting for update signal from WDS...
            [WDS] Hot Module Replacement enabled.
---


* so we'll open the browser and the terminal side by side so we can watch the bundling/refreshing

### 11/14/20
* so the HRM bits seem to work, only recompiling the changed(hot) file(module)
    
    ℹ ｢wdm｣: Compiling...    
    ℹ ｢wdm｣: assets by status 1.38 MiB [cached] **1 asset**
    assets by path *.js 69.7 KiB
    asset app.bundle.js 64.4 KiB [emitted] (name: app)
    asset app.f42390b78a4f52da10c4.hot-update.js 5.29 KiB [emitted] [immutable] **[hmr]** (name: app)
    asset f42390b78a4f52da10c4.hot-update.json 27 bytes [emitted] [immutable] **[hmr]**
    Entrypoint app 1.45 MiB = vendor.bundle.js 1.38 MiB app.bundle.js 64.4 KiB app.f42390b78a4f52da10c4.hot-update.js 5.29 KiB
    cached modules 1.31 MiB [cached] 44 modules
    runtime modules 27.6 KiB 12 modules
    **./src/IssueFilter.jsx** 3.43 KiB [built] [code generated]
    webpack 5.4.0 compiled successfully in 172 ms
    ℹ ｢wdm｣: Compiled successfully.

* however, we're getting errors now when we load from either port

#### localhost:8000
> Uncaught Error: Target container is not a DOM element.        react-dom.development.js:26086

#### localhost:3000
> GET http://localhost:3000/ 404 (Not Found)

> Refused to load the image 'http://localhost:3000/favicon.ico' because it violates the following Content Security Policy directive: "default-src 'none'". Note that 'img-src' was not explicitly set, so 'default-src' is used as a fallback.      localhost/:1 

* I didn't make any changes to the nodemon script, or any of its dependancies...
* Nothing about the port 3000, and nothing in server.js has changed...
* webpack must be adding something to the bundles?


* got it! webpack generates an index.html file for you when you use the plugin, I needed to take the orginal index.html that was getting replaced and move it to src, then in webpack.config I added that file as a template to the htmlplugin

* but the buttons don't work, I can't add anything and there's still a console error

    Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
        at IssueList (webpack://glub/./src/IssueList.jsx?:60:5)

* okay... seems I can't do both at the same time anymore because both want to recompile and break the running one...
* I think  I see why he split the ui and api into two servers in the second edition. Probably going to do the same here

#### resolved:
the index.html being generated had additional tags, it links to the bundles for you so I removed it from src/index.html (the template) and the result is what we expect now.

In testing confirmed the HMR is working (today's original goal), updates to one file onle recompiles the one, the add api is working again while both servers are running, refreshing both after changes and adding issues they continue to work. Great success.
> page 131: "its best if you delete the files app.bundle.js so that they don't get served by the 3000 server, and an error will be immediately apparent."
* So, it looks like the error I was dealing with was in the book and I misunderstood it, but I guess I'm not sure I agree with this.
* Running compile I kind of get a stable version, that I can run serve from 3000, and compare the changes I'm making on the 8000 server side by side even. 
A normal workflow might look like:
1. pull the latest version
2. compile and run the server on the normal 3000 port
3. run the dev server on 8000
4. make changes/updates - updates will be immediately viewable on the 8000 port, but the 3000 will show where you started
5. save changes and push (we should add the bundles to the git ignore)

### Server-side ES2015
* I won't be surprised if I need to do less than the book thinks here
* look into the babel presets we used "es2015" instead of "es2015-node4", and the book references "es2015-node6" for node six. I'm on node v15.1.0 so I figure I'm either using an old version and this isn't working 'completely' I just don't know what's not supported yet, or this isn't needed anymore and node is just working anyway (not the case: when we try to start from the server file - pre-compile we got errors about the import statement), 

Old npm start command with npx:
> npx nodemon -w server server/server.js

    (node:2666) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
    (Use `node --trace-warnings ...` to show where the warning was created)
    /home/fishbot/mern-stack/glub/server/server.js:1
    import 'babel-polyfill';
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

* also look more into the require hook, that is syntax I've not seen before
```javascript
require('babel-register')({
    presets: ['es2015']
});

require('./server.js')
```

### ESlint
* I may not want linting at all, however we are using books recomended ruleset & extending airbnb config here but removing additional rules 

|Additional Exclusions|Rule Name|Justification|
|---|---|---|
|Missing Semicolon|*semi*|better to understand the special cases where it is required than to default to using it all the time|
|Missing trailing comma|*comma-dangle*|I just think this looks sloppy|
|Require a curly after an if/else|*nonblock-statement-body-position*|overriding to allow a newline before non-block if statements|
||*import/extensions*|jsx imports were not resolving when I removed the .jsx extension from the import|
||*newline-per-chained-call*|this we allowed chains of 2. I like this formatting|
|one expression per line|"react/jsx-one-expression-per-line"|made for *really* ugly code in issue Edit do not like this {' '}|
|jsx indent props|react/jsx-indent-props|two space rule was conflicting with the eslint(indent) rule|

#### Resolving lint errors:
* added button type "button" to this button. What does the button type do?
* adding type="button" to the add button in the submit form breaks it - **submit** worked I think there may have been other errors in the way the other day
```jsx
<button type="button" onClick={this.createTestIssue}>Glub</button>
```
* prop-types -> only found simple examples of this, we have nested objects which are forbidden by another eslint rule. IssueRow holds and Issue object, and IssueTable holds an issue array, not sure how to validate the nested values. We have the server validation for inserting objects so I wouldn't expect anything here to ever be malformed.


##### 11/17
* fixed the last two errors, lint returns successfully now (neat)

## Chapter 8: Routing with React Router
---
stackoverflow:

    They got rid of individual histories such as browserHistory and hashHistory and instead replaced them with BrowserRouter and HashRouter components respectively in React Router v4:

so we ... 
> import { HashRouter as Router, Route } from 'react-router-dom';

* in issueEdit we used object for a prop type, maybe this is a new requirement for the airbnb lint config

* editIssue from the book expects the Route component to receive a params prop, which it does its just inside of an object called 'match'
* also we're still displaying them as components on a single page, book shows the routes as indidviual pages

***fixed:*** Just needed to put the routes into a Switch tag

* filter is not filtering when we call the api, seeing in a few places that hashrouter doesn't support the props.location.[key] api switching over to **browser router**

##### 11/21
* in the [filter](./src/IssueFilter.jsx) we set the search params in the "location" object that we have in the props
* in the [list](./src/IssueList.jsx) we pulled from the "match" object in the props
* fixed both use the location.search field and now the routing is working :thumbsup:

* now the IssueEdit links in the list rows are not routing to the edit page...
* this was a route matching thing, making the /issues route have the 'exact' attribute allowed it us to match the other component when we pass parameters

##### 11/22
* Links are now all working

## Chapter 9: Forms
---
* starts the chapter off with the effort example, I never really liked having an arbitrary "effort" field with non descript integer value
* a better idea might be to have it watch the github repo for commits/contributions and increment based on frequency/volume so effort goes up the more you've worked on it, making it a tracked "effort so far" value instead of an estimated "difficulty" value
    * Eventually all projects should tie to repos (should they? the point was kind of local todo/issue tracking. Do we want to require internet access? do we already?)
    * Optional link projects to repos with lazy updates would be most ideal
        * we want to track abstract ideas that have no code as well 
        * ^^ these could live as gists, or simple repos that just hold markdown files
            * why not just as markdown documents sitting in the mongo db?

##### 11/24

> componentWillReceiveProps has been renamed
* stack overflow recomends using static method getDerivedStateFromProps instead, don't call set state, return the new state
* none of the added forms/buttons working on the new filter, I think because we're using the query string as a string and the filter builds a query object

##### 11/25
* yeah it was the getDerivedStateFromProps method, I just removed it since the examples I was finding for forms had neither componentWillReceiveProps or getDerivedState. It works now, this must be something newer versions of react handle on their own (not really sure what case this was supposed to handle...)

* I can't navigate to a specific filter when typing in query params to the address bar however
* again I think this has something to do with the way I pass the search object/string to the filter. 
* yeah I think I need to split the initfilter out into the fields expected in the issuefilter contstructor
    * could probably regex /status=(.*)&/

##### 11/26
* tried some goofiness with the string to regex the value and it worked, but still not routing properly when navigating via address, this is what withRouter was supposed to accomplish for us. Need to confirm the behavior of withRouter and push
* its extracting the fields from the string correctly but it seems like the constructor for the filter is getting called twice, once correctly and then resetting itself... is this because of the 404 redirect logic?
* I think its because setFilter doesn't get called until you press glub, I think the willReceiveProps method we removed might have been in place to handle this, pretty confident we need another lifecycle method to take its place 

> getDerivedStateFromProps
    looking at this one again, another thing that assumes init filter is an object, gives "nextProps" and "prevState" state holds an object, props will have a query string, so we'll need to parse again to compare. I don't like all the parsing going on now and I kind of think we should start using just a string and extract on the render instead of extract everywhere and only use the object on render...

* its the async load data call in issueList I think, we are fetching the right amount of records when we go to an address with a filter, and setting the state properly but we reload an empty filter and then get Warning: Can't perform a React state update on an unmounted component 
    * how could that be? we don't call load data until we are inside componentDidMount?
* not sure why the issueFilter constructor is called twice

* removing get derived state seems to work exactly the same...
```jsx
   static getDerivedStateFromProps(nextProps, prevState) {
        console.log({ nextProps })
        console.log({ prevState })
        return {
            status: nextProps.initFilter.match(/status=(\w+)/) ? nextProps.initFilter.match(/status=(\w+)/)[1] : '',
            effort_gte: nextProps.initFilter.match(/effort_gte=(\d+)/) ? nextProps.initFilter.match(/effort_gte=(\d+)/)[1] : '',
            effort_lte: nextProps.initFilter.match(/effort_lte=(\d+)/) ? nextProps.initFilter.match(/effort_lte=(\d+)/)[1] : '',
            changed: false
        }
    }
```
very confusing
1. the location fetches the query string correctly 
2. a filter is created with the right parameters 
3. filterList calls componentDidMount
4. a new blank filter is created
5. filterList calls componentDidMount again
6. filterList loadData returns with the correct data from didMount
7. Error that we can't update an unmounted component
8. filterList loadData returns again with defaut data from didMount


Console:

    "?status=Open&effort_gte=1&effort_lte=10"
    IssueFilter.jsx:7 constructor, received props:
    IssueFilter.jsx:8 {props: {…}}
    IssueFilter.jsx:15 constructor, after set state:
    IssueFilter.jsx:16 {status: "Open", effort_gte: "1", effort_lte: "10", changed: false}
    IssueList.jsx:66 component did mount...
    IssueList.jsx:154 ""
    IssueFilter.jsx:7 constructor, received props:
    IssueFilter.jsx:8 {props: {…}}
    IssueFilter.jsx:15 constructor, after set state:
    IssueFilter.jsx:16 {status: "", effort_gte: "", effort_lte: "", changed: false}
    IssueList.jsx:66 component did mount...
    log.js:24 [HMR] Waiting for update signal from WDS...
    IssueList.jsx:97 Total count of records: 1
    react-dom.development.js:67 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    at IssueList (http://localhost:8000/app.bundle.js:556:5)
    at withRouter(IssueList) (http://localhost:8000/vendor.bundle.js:31602:37)
    Total count of records: 4

> why does the good object get unmounted before the good data comes in? I suspect this is caused by the redirect/fallback behavior where anything route that's not exactly "/issue" redirects to /issue that we lose the location provided in the address bar...

okay I think I'm starting to understand:
* I read that when a component has a child component that has props assigned it can trigger a remount for the parent
* so we're 
    * initial render
    * first didMount()
        * fetching the issues...
    * assign the filter prop to the child
    * remount everything
    * issues return 


##### 12/03 Resolution
* react router v4 does not preserve query strings in addresses, they need to be explicited forwarded
```jsx
const RoutedApp = () => (
    <Router>
        <Redirect from="/" to={{ ...location, pathname: '/issues' }} />
        <Route path="/" component={withRouter(App)} />
    </Router>
)
```
* I think this means I should fix the string manipulation stuff I was doing to use the location object now, but at least the addresses are resolving to the right filter.
* the 'memory leak' error persists, but I think we know why that is now
* going directly to / instead of /issues (no redirect) doesn't give the error
* we are mounting fetching, redirecting, and fetching again

##### 12/10/20 edit page/update api
* update api working correctly
* unable to navigate directly to an issue by address with its Id, and unable to refresh the page successfully when we are there
* I suspect this will take some messing with the router, not sure if the book plans to address this 
    * the link inside the table elements works, I feel like this is again an issue with the redirecting/nested routes
    * our router configuration is significantly different than the books
        * redirect no longer preserves query params by default
        * nested routes are no longer supported
```jsx
<Link to={`/issues/${issue._id}`}>
    {issue._id.substr(-4)}
</Link>
```

* added "publicPath" to webpack config because I noticed when we start the dev server we were getting a message "webpack output is served from Undefined"
    * not entirely sure what the consequence of this is

##### 12/11/20
* this has to be a result of the redirect, we're preserving the query sting but not the path apparently
    * we can navigate to the page with buttons, but refresh or navigating by address breaks it

Adding a 'base' tag to the index template fixed the 404's but we still aren't preserving the id param, and navigating by address doesn't work for the edit page
```html
  <base href="http://localhost:8000/">
```

##### 12/12/20
* Resolved:
    * instead of the routed app being a component that only does a redirect to the 'app' component, we now have the app component as a "layout" it doesn't do any routing on its own it just renders the header and footer
    * then the routedApp component passes the router switch as children to the layout
        * this works nicely and also solved my double rending/memory leak problem from above
        * I think I could revert these changes and fix the other problem now, but I like this structure better. I think the problem was when we were redirecting even when a valid path was given, we needed to do the redirect after the switching not before, and we had the app component along side the redirect so we were rendering it before and after redirecting.

##### Update api

Need to look at the mechanics of the invalidFields thing again, we load the name of the field holding an invalid value and add it to the state? then block updates if there are any named names? I think?
```jsx
if (Object.keys(state.invalidFields).length !== 0) {
            return;
}
```

* update api is working from the edit page but it's not updating the completion date.
* I'm thinking it's probably an issue with DateInput, because effort is updating correctly so we are sending a request to the endpoint that the server is updating the database with, it just includes a completion date of null even though the component is validating the string properly
    * guarantee this is something stupid 

```json
{"_id":"5fb9a3635e042a057d4edbf6","status":"New","owner":"finchboat","created":"2020-11-21T23:31:47.024Z","title":"your TV has no COMPUTE, plz insert computer","completionDate":null,"effort":"37"}
```
**idea** : vscode extension for formatting code snippets inside ``` blocks in markdown files

* Actually forgot these two lines that actually update the state after validating... so we were validating but not updating... I knew it was something stupid. Update api is working now.

```javascript
    this.setState({ focused: false, valid });
    if (valid) props.onChange(e, value);
```

## Chapter 10: React-Bootstrap

* right away problems with webpack, because we are using an index template and clearing the file, the bootstrap link is getting removed... 
    * instead of the linking method used in the book we will need the webpack style and css loaders to include the Bootstrap stylesheet
* Bootstrap dropped Glyphicon support in V4 [bootstrap migration](https://getbootstrap.com/docs/4.0/migration/#components)
    
    Dropped the Glyphicons icon font. If you need icons, some options are:
    the upstream version of Glyphicons
    Octicons
    Font Awesome
    See the Extend page for a list of alternatives. Have additional suggestions? Please open an issue or PR.

* switched index to point to font awesome for icons, made delete button a little bomb 
* style was working, the import from index needed to be removed since we imported in app.jsx instead

##### 12/15/20

* book mentions adding react-router-bootstrap to the entry object in webpack config to include it in the vendor bundle, but I think the "split chunks" optimization handles this... should look into it some more 
> vendor: ['react', 'react-dom', 'react-router', 'react-bootstrap', 'react-router-bootstrap']

* there are a number of places where he's only including these as dev dependencies. This hasn't worked for me I wonder if I'm including a bunch of extra modules I don't need for the production build?

> export 'MenuItem' (imported as 'MenuItem') was not found in 'react-bootstrap'

using this instead : 
```jsx
<Dropdown.Item>
```

Doesn't seem to recognize Header either...
```jsx
<Navbar.Header>
```

pullRight becomes 
```jsx
<Nav className="ml-auto">
```

##### 12/16/20

* Link containers needed to be removed and Nav.Items changed to Nav.links with hrefs
    * noCaret is removed because it's not optional with the styles anymore - see index.html for #user-dropdown style
    * Book exercices say not to do this because link container will also show what link is active

##### 12/17/20 

* link containers added back, Nav.Items-> Nav.links is all we needed. not using hrefs.

> 'Panel' (imported as 'Panel') was not found in 'react-bootstrap'

![removed](https://react-bootstrap.netlify.app/migrating/#panel), replaced with Card components
I think we need to use accordian instead

* accordion works, requires eventKey for it to function properly. Getting the feeling eventKey might be out of the scope of this book.
* might be because accordion is using a button instead of an a tag but using block dislpay for the button centers the text
    * not a big issue but should look at how to left justify

    ![controlLabel renamed to FormLabel](https://react-bootstrap.netlify.app/migrating/)
* InputGroup#
removed InputGroup.Button, and InputGroup.Addon
added InputGroup.Prepend, InputGroup.Append, InputGroup.Text, InputGroup.Checkbox, InputGroup.Radio

* form control componentClass attribut becomes "as"

##### 12/18/20

bsStyle -> variant

* think I got the link/import of Bootstrap to work same as the book by changing the cleanWebpack plugin to ignore the link in the static folder
    * removed the import from app.jsx
* The other was WAS working, I do feel a bit strange about importing from the index instead of through npm
* condensed attribute in Table is no longer available switched it to 'striped' for fun

##### 12/19 Horizontal Forms
* replaced all controlLabels with FormLabels and swapped Panel for Card
* Link container takes a Nav.Link 
* smOffset becomes an offset field in the "sm" object, the original number held by sm becomes a span in the same object
* Form Groups needing significant refactoring
    * nothing rendering at this point, going back and adding one at a time based on the new syntax
    * noValidate on the root Form tag to block browser native html validation
* if you change the completion date in the edit form you must change it to a valid date, you can't remove completion date once it is set

* went back and added the card.body to the issue filter to fix formatting
    * I also fiddled with the column values to something that makes more sense I think

```jsx
<Form.Group as={Row} controlId="formIssueTitle">
    <Form.Label column sm={3}>
        Title:
    </Form.Label>
    <Col sm={9}>
        <Form.Control type="text" name="title" value={issue.title} onChange={this.onChange} />
    </Col>
</Form.Group>
```

##### 12/20 Alerts

* Alert
    * onDismiss renamed to onClose

* showError doesn't seem to get called at all?
* success message is working, so the issue is we just never toss an exception to catch in the fetch... I think
    * I forget if we're blocking the request if validation doesn't pass... I think this is the cases


##### 12/22 Modal
* modal pops up but hide/cancel buttons don't work. also document.forms api seems to have changed, having trouble extracting values from the modal to submit

##### 12/23
* needed to wrap just the modal in a div and stopPropagation on clicks

##### 12/24
* the issueAdd form still exists on the page and the names were colliding, and we were sending null. Changed the form in the modal to issueAddModal, now we're pulling the fields out of the modal correctly.
* and when we use with router we need to push to props.history not directly to the router apparently