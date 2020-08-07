import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize} from 'rxjs/operators';


export class ServiceDataSource implements DataSource<any> {

    private data = new BehaviorSubject<any[]>([]);
    private loadingData= new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingData.asObservable();

    constructor(private source, private name, private input) {}

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.data.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.data.complete();
        this.loadingData.complete();
    }

    load() {

        this.loadingData.next(true);
        console.log(this.source[this.name])

        this.source[this.name](this.input).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingData.next(false))
        )
        .subscribe((data: any[]) => this.data.next(data));
    }    
}