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

### resolved:
the index.html being generated had additional tags, it links to the bundles for you so I removed it from src/index.html (the template) and the result is what we expect now.

In testing confirmed the HMR is working (today's original goal), updates to one file onle recompiles the one, the add api is working again while both servers are running, refreshing both after changes and adding issues they continue to work. Great success.