# Posts
Plugin to edit/publish entries for the blog.

## Tree File Structure
````
.
├── README.md
├── api
├── assets
├── helpers
├── migrations
├── package.json
├── plugin.js
├── sio
├── test
│   ├── e2e
│   └── helpers
├── views
└── web
````

## Add this package as github module
````sh
git submodule add git@github.com:MoNoApps/posts.git plugins/posts
````

## Run migrations
node plugins/posts/migrations/seed.js

