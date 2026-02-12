# Redux & RxJS Integration to the react application

Rx works great for event-heavy frontends and apps. 

Rx is not a framework restricted to one specific type of application or language. It really is a paradigm that you can use when programming any event-driven software.

Reactive programming is programming with asynchronous data streams.You are able to create data streams of anything, not just from click and hover events. Streams are cheap and ubiquitous, anything can be a stream: variables, user inputs, websocket messages, API requests/responses, etc. 

Streams are so central to Reactive.A stream is a sequence of ongoing events ordered in time.We capture these emitted events only asynchronously, by defining a function that will execute when a value is emitted.

    - The "listening" to the stream is called subscribing. 
    - The functions we are defining are observers.
    - The stream is the subject (or "observable") being observed. 

A stream can be used as an input to another one. Even multiple streams can be used as inputs to another stream. You can merge two streams. You can filter a stream to get another one that has only those events you are interested in. You can map data values from one stream to another new one.That's where the "functional" magic kicks in.

In common Reactive libraries, each stream has many functions attached to it, such as map, filter, scan, etc. When you call one of these functions, such as clickStream.map(f), it returns a new stream based on the click stream. It does not modify the original click stream in any way. This is a property called immutability, and it goes together with Reactive streams just like pancakes are good with syrup.

A Promise is simply an Observable with one single emitted value. Rx streams go beyond promises by allowing many returned values.


## npm libraries
## redux-obeservable(1.2.0)
    - combineEpics
    ~~~javascript
    const socketEpics = combineEpics(
        socketConnectEpic, 
        socketErrorEpic, 
        socketDisconnectedDialog, 
        SocketReconnectedDialog, 
        socketReconnectEpic);

    const appEpics = combineEpics(socketEpics)
    ~~~
    - createEpicMiddleware
    ~~~javascript
    const epicMiddleware = createEpicMiddleware();
    ~~~
    - ofType
    ~~~javascript

    ~~~
## redux-logger(3.0.6)
    - logger    
## redux(4.0.0)
    - compose
    ~~~javascript
        var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    ~~~
    - applyMiddleware
    Creates a store enhancer that applies middleware to the dispatch method of the Redux store. This is handy for a variety of tasks, such as expressing asynchronous actions in a concise manner, or logging every action payload.Because middleware is potentially asynchronous, this should be the first store enhancer in the composition chain.See redux-thunk package as an example of the Redux middleware.Note that each middleware will be given the dispatch and getState functions as named arguments.

        @param middlewares — The middleware chain to be applied.

        @returns — A store enhancer applying the middleware.

    ~~~javascript
    import { createEpicMiddleware } from 'redux-observable';
    import logger from 'redux-logger'
    const epicMiddleware = createEpicMiddleware();
    const  applyMiddleware(epicMiddleware, logger)

    ~~~
    - combineReducers
    ~~~javascript
    var appReducers = combineReducers({...reducers})
    ~~~
    - createStore
    ~~~javascript
        var store = createStore( appReducers, {}, composeEnhancers(applyMiddleware(epicMiddleware, logger)));
        epicMiddleware.run(appEpics);
    ~~~

## react-redux(7.2.3)
    - Provider
    - connect

## redux-actions(1.2.0)
## reselect(1.2.0)
## rxjs(6.6.7)
    
Reactive Extensions Library for JavaScript.
    
Using RxJS, you can represent multiple asynchronous data streams (that come from diverse sources, e.g., stock quote, tweets, computer events, web service requests, etc.), and subscribe to the event stream using the Observer object. The Observable notifies the subscribed Observer instance whenever an event occurs.

Whether you are authoring a web-based application in JavaScript or a server-side application in Node.js, you have to deal with asynchronous and event-based programming. Although some patterns are emerging such as the Promise pattern, handling exceptions, cancellation, and synchronization is difficult and error-prone.

    - BehaviorSubject
    - Subject
    - timer
    - interval
    - EMPTY
    - of
    - concat
## rxjs/webSocket
    - webSocket
    ~~~javascript
        import {Subject, BehaviorSubject} from "rxjs";

        export const socketSubject = new BehaviorSubject({});
        const openEvents = new Subject();
        const closeEvents = new Subject();
        const errorEvents = new Subject();

        const loc = window.location;
        const protocol = loc.protocol === "https:" ? "wss:" : "ws:";
        const url = `${protocol}//${loc.host}/api/adminStream`


        const ws = webSocket({
            url,
            openObserver: openEvents,
            closeObserver: closeEvents,
            errorObserver: errorEvents,
        });

        ws.subscribe({
            next: (v) => socketSubject.next(v),
        });

        openEvents.subscribe(() => {
                const initializeMessage = { MessageType: 'INITIALIZE_ADMIN', ClientIP: "192.168.1.200" }
                ws.next(initializeMessage)
            }
        );
      
        let errorSub = null;
        let closeSub = null;

        closeSub = closeEvents.subscribe(() => {
            closeSub && closeSub.unsubscribe();
            errorSub && errorSub.unsubscribe();
        });

        errorSub = errorEvents.subscribe(() => {
            closeSub && closeSub.unsubscribe();
            errorSub && errorSub.unsubscribe();
        });

    ~~~
## rxjs/operators
Reactive Programming, take a while to get acquainted with the big list of functions for transforming, combining, and creating Observables.

    - catchError
    - delayWhen
    - first 
    - flatMap
    - map 
    - pluck 
    - switchMap 
    - takeUntil,
    - distinctUntilChanged,