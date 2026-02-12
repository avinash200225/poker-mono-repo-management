# React 

## React Custom Hooks
Hooks are a new addition in React 16.8 that will let you use state and other react features without writing a class component.
Writing custom hooks is a way of composing component logics into functions that are re-usable.

Use cases are,
1. Application has to make a lot of API calls that are Async nature,
   - What is different? - url, data
   - What are common? - isLoading, error
   So, the signature shall be (url) => [data, isLoading, error]

2. Application need a Counter Bot
    - What is different ? - start, end, delay, step, onEnd function 