# Web Performance and Security Report
I did a quick web performance and security test on the deployed website using 4 different online tools:
- Xss
- Google Lighthouse
- WebPage
- GMetrix

## Xss
The results report from XSS Scanner that 3 out of 3 security tests passed successfully and there are no critical vulnerabilities.
![](/docs/img/xssreport.png)

## Google Lighthouse
The report from Google Lighthouse shows that the largest contentful paint (content data) took 1 second to load, meaning the users can immediatelly see the website when opened and no requests are blocking the initial load. Google Lighthouse rated the performance of ther website at 99 out of 100.
![](/docs/img/lighthouseperformance.png)

## WebPage
I tested the mobile version of the application with WebPage Performance Test. In total I got "Not bad" for the 3 criteria tested:
- Is it Quick?
- Is it Usable?
- Is it Resilient?

![](/docs/img/webpagetest.png)

## GMetrix
The result from GMetrix showed a performance score of 99% and an A grade.
![](/docs/img/gmetrix.png)


