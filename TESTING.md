##This application runs two different types of testing tools.
the first is just unit testing with Angular using Jasmine as the syntax and the
command for running unit testing is
**gulp test**

the second is the smokeTests which can run full e2e running using Protractor as
a wrapper for Selenium which Angular recommends, and typing in the Jasmine syntax
the command for that is
**gulp smokeTests**

a Plato coverage tool should be able to be shown in the coverage folder for smokeTests for line
coverage and complexity.