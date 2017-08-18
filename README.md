GAGGLE README
###############

Build Instructions:
-install Node JS if you haven't already done so
-install MongoDB
-If it does not exist, mkdir C:\data\db or ~\data\db (for datastore)
-Clone Repo from Github (or use zip if applicable)
-cd into root app folder, run 'npm install'
-open new cmd/terminal, cd C:\data\db (or ~\data\db for mac), run 'mongod' OR ‘mongod -dbpath C:\data\db’
-install nodemon with ‘npm install -g nodemon’ (for dev only, you can just use node for one time use)
-run 'webpack' to build react bundle (may need to install webpack globally using ‘npm i webpack -g’). For prod build, use ‘npm run prodBuild’
-run 'npm run dev' from root app folder to start server, ‘npm run start’ for non dev, or ‘npm run prodStart’ to start forever process
-open browser, navigate to localhost:8080/


Also will need to:
Add file named '.env' to root folder with:
TOKEN_SECRET= 
SESSION_SECRET=
PORT=8080 
MONGO_HOST=localhost 
MONGO_PORT=27017 
MONGO_USERNAME= 
MONGO_PASSWORD= 
FACEBOOK_CLIENT_ID=
FACEBOOK_SECRET=
GOOGLE_MAP_KEY=