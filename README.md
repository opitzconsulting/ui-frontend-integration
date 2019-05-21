# ui-frontend-integration

## ng-micro-frontends-1

Everybody is developing Microservices. But what about the frontend? Should be create another
[majestic monolith](https://m.signalvnoise.com/the-majestic-monolith/), this time within the browser?

No. Not if your application is huge enough to require Microservices. More likely than not,
your frontend is big enough to become a maintanence hell. It's better to split it into
smaller parts, too.

This is one possible approach how to do it. Our prototype shows

- how to bundle an Angular app with its node.js backend into a single deployment artifact,
- how to run simulaneous Angular apps simultaneously
- and how to mesh them into a single, joint application.

Click [here](./ng-micro-frontends-1/README.md) to show documentation.
