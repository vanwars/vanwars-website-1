# Installation
 
```bash
# 1. Install rvm
# 2. Install ruby 2.7 using rvm:
rvm install 2.7
rvm use 2.7
# 3. navigate to the jekyll code
# 4. remove directories that shouldn't be there:
rm -r .bundle
rm -r vendor

# 5. Install Gemfile
bundle update
bundle install
```


# Running Locally
To run this course website locally, please install Jekyll and then do the following:

```bash
bundle exec jekyll serve    # to run Jekyll from command line

# Then open link in a web browser:
# Server address: http://127.0.0.1:4000/fall2021/
```
