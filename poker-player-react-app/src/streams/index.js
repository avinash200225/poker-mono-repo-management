import { BehaviorSubject } from 'rxjs';
export var stateSubject = new BehaviorSubject({});
export var socketSubject = new BehaviorSubject({});
export var state$ = stateSubject.asObservable();
export var socket$ = socketSubject.asObservable();