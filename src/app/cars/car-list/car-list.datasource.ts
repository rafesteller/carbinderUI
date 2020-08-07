import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize} from 'rxjs/operators';

import { Car } from '../car';
import { CarService } from '../car.service'

export class CarListDataSource implements DataSource<Car> {

    private cars = new BehaviorSubject<Car[]>([]);
    private loadingCars = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingCars.asObservable();

    constructor(private carService: CarService) {}

    connect(collectionViewer: CollectionViewer): Observable<Car[]> {
        return this.cars.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.cars.complete();
        this.loadingCars.complete();
    }

    loadCars() {

        this.loadingCars.next(true);

        this.carService.getCars().pipe(
            catchError(() => of([])),
            finalize(() => this.loadingCars.next(false))
        )
        .subscribe((cars: Car[]) => this.cars.next(cars));
    }    
}