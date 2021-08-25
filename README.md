# url-webcrawler
### Build a full stack application that accepts a URL and returns the iterations of every word located on that page

### Steps to run
#### 1. Inside url-web-crawler-api and url-webcrawler-app run:  
```
npm install

```

#### 2. Inside url-web-crawler api run:
```
npm run dev

```

#### 3. Inside url-web-crawler-app run:
```
npm start

```

#### The ports are set at 5000 for the backend and 3000 for the front end respectively

### Note: This aplication uses axios as the remote db, and has no authentication so the data is shared across all users

### Known issues: 
#### 1. The db sometimes returns an empty object when getting all urls from the db, this can be mitigated by refreshing page.
#### 2. When computing the word count of a new url, the page needs refreshed to update the exisiting urls
#### 3. Did not have time to complete test coverage as the project was quite long. 
#### 4. Docker would have been a nice addition for universal compilation, but it is not something I am super well versed in and did not have the time to learn to implement.
#### 5. The word search is not perfect. It definetly seems to add some unintended html, and some words return a function as the word count.
#### 6. The parent object name for the list of urls in all-urls service is undefined, this is not ideal.
#### 7. Better comment coverage.
#### 8. Pagination for the urls table not implimented.
#### 9. I will be keeping the user key for axios public temporarily for testing purposes by Nate, will delete after feedback. 


