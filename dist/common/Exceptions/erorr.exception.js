"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conflictException = exports.notFoundExcepetion = exports.forbiddenExcepetion = exports.unauthorizedExcepetion = exports.badRequestExxeption = exports.ApplicationExecptions = void 0;
class ApplicationExecptions extends Error {
    status;
    constructor(message, status, cause) {
        super(message, { cause });
        this.status = status;
    }
}
exports.ApplicationExecptions = ApplicationExecptions;
class badRequestExxeption extends ApplicationExecptions {
    constructor(message, cause) {
        super(message, 400, cause);
    }
}
exports.badRequestExxeption = badRequestExxeption;
class unauthorizedExcepetion extends ApplicationExecptions {
    constructor(message, cause) {
        super(message, 401, cause);
    }
}
exports.unauthorizedExcepetion = unauthorizedExcepetion;
class forbiddenExcepetion extends ApplicationExecptions {
    constructor(message, cause) {
        super(message, 403, cause);
    }
}
exports.forbiddenExcepetion = forbiddenExcepetion;
class notFoundExcepetion extends ApplicationExecptions {
    constructor(message, cause) {
        super(message, 404, cause);
    }
}
exports.notFoundExcepetion = notFoundExcepetion;
class conflictException extends ApplicationExecptions {
    constructor(message, cause) {
        super(message, 409, cause);
    }
}
exports.conflictException = conflictException;
