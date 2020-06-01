import { HttpClient, HttpResponse } from "@angular/common/http";
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { TestBed } from '@angular/core/testing';
import { Category } from '../../models/job/category.model';

describe('categoryService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let categoryService: CategoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ CategoryService ]
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        categoryService = TestBed.get(CategoryService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#getAllCategories', () => {
        const expectedCategories: Category[] = [
            {id: 1, label: 'category 1'},
            {id: 2, label: 'category 2'},
        ];

        it('should return expected categories', () => {
            categoryService.getAllCategories().subscribe(
                data => expect(data).toEqual(expectedCategories, 'should return expected categories'),
                fail
            );

            const req = httpTestingController.expectOne(categoryService.API_URL);
            expect(req.request.method).toEqual('GET');

            req.flush(expectedCategories);
        })
    });

    describe('#addCategory', () => {
        const newCategory = {
            label: 'category 1'
        };

        it('should add and return a new category', () => {
            categoryService.addCategory(newCategory).subscribe(
                data => {
                    expect(data['label']).toEqual(newCategory.label, 'should return the category\'s label');
                    expect(data['id']).toEqual(1, 'should return the category\'s id');
                },
                fail
            );

            const req = httpTestingController.expectOne(categoryService.API_URL);
            expect(req.request.method).toEqual('POST');

            const expectedResponse = new HttpResponse(
                {
                    status: 201,
                    statusText: 'Created',
                    body: {
                        id: 1,
                        label: 'category 1',
                        createdAt: new Date()
                    }
                }
            );
            req.event(expectedResponse);
        });
    })
});