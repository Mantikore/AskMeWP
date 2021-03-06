
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { AuthorsService } from '../../services/authors.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let authService: AuthService;
    let authorsService: AuthorsService;

    beforeEach(() => {
        authService = new AuthService(null, null);
        authorsService = new AuthorsService(null);
        component = new LoginComponent(authService, authorsService);
    });

});
