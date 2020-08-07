import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize} from 'rxjs/operators';

import { User } from '../user';
import { UserMangService } from './user-mang.service'

export class UserMangDataSource implements DataSource<User> {

    private users = new BehaviorSubject<User[]>([]);
    private loadingUsers = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingUsers.asObservable();

    constructor(private userMangService: UserMangService) {}

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        return this.users.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.users.complete();
        this.loadingUsers.complete();
    }

    loadUsers() {

        this.loadingUsers.next(true);

        this.userMangService.getUsers().pipe(
            catchError(() => of([])),
            finalize(() => this.loadingUsers.next(false))
        )
        .subscribe((users: User[]) => this.users.next(users));
    }    
}