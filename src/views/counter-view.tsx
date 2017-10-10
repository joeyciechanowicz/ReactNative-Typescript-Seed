import * as React from 'react';
import {Observable} from 'rxjs/Observable';
import {CounterState} from '../models/counter-model';
import {Button, Text, View} from 'react-native';
import {Subject} from 'rxjs/Subject';
import {MVIView} from './mvi-view';


// The view. Implements one function that returns the rendering of our state
// Also expose any streams of events you want to raise intents from
export class CounterView extends MVIView<CounterState> {
    private incrementButtonSubject: Subject<void> = new Subject<void>();
    private decrementButtonSubject: Subject<void> = new Subject<void>();

    get incrementButton(): Observable<void> {
        return this.incrementButtonSubject.asObservable();
    }

    get decrementButton(): Observable<void> {
        return this.decrementButtonSubject.asObservable();
    }

    redraw(state: CounterState) {
        if (!state) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View>
                <Text>Total: {state.count}</Text>

                <Button onPress={() => this.incrementButtonSubject.next()} title="Increment"/>
                <Button onPress={() => this.decrementButtonSubject.next()} title="Decrement"/>
            </View>
        );
    }
}
