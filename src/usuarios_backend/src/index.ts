import {
    Canister,
    Err,
    Ok,
    Opt,
    Principal,
    query,
    Record,
    Result,
    StableBTreeMap,
    text,
    update,
    Variant,
    Vec
} from 'azle';

const User = Record({
    id: Principal,
    nombre: text,
    primerApellido: text,
    segundoApellido: text,
    alias: text
});
type User = typeof User.tsType;

const Event = Record({
    id: Principal,
    tipoEvento: text,
    lugarEvento: text,
});
type Event = typeof Event.tsType;

const Pago = Record({
    id: Principal,
    cuenta: text
});
type Pago = typeof Pago.tsType;

const Ruta = Record({
    id: Principal,
    GPS: text
})
type Ruta = typeof Ruta.tsType;

const AplicationError = Variant({
    UserDoesNotExist: text
});
    
type AplicationError = typeof AplicationError.tsType;

let users = StableBTreeMap<Principal, User>(0);

let events = StableBTreeMap<Principal, Event>(0);

let pagos = StableBTreeMap<Principal, Pago>(0);

let rutas = StableBTreeMap<Principal, Ruta>(0);

export default Canister({
    createUser: update([text, text, text, text], User, (nombre, primerApellido, segundoApellido, alias) => {
        const id = generateId();
        const user: User = {
            id:id,
            nombre: nombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            alias: alias
        };

        users.insert(user.id, user);

        return user;
    }),
    readUsers: query([], Vec(User), () => {
        return users.values();
    }),
    readUserById: query([text], Opt(User), (id) => {
        return users.get(Principal.fromText(id));
    }),

    deleteUser: update([text], Result(User, AplicationError), (id) => {
        const userOpt = users.get(Principal.fromText(id));

        if ('None' in userOpt) {
            return Err({
                UserDoesNotExist: id
            });
        }

        const user = userOpt.Some;
        users.remove(user.id);
        return Ok(user);
    }),
    updateUser: update(
        [text, text, text, text, text],
        Result(User, AplicationError),
        (userId, nombre, primerApellido, segundoApellido, alias) => {
            const userOpt = users.get(Principal.fromText(userId));

            if ('None' in userOpt) {
                return Err({
                    UserDoesNotExist: userId
                });
            }
            const newUser: User = {
                id:Principal.fromText(userId),
                nombre: nombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                alias: alias
            };

            users.remove(Principal.fromText(userId))
            users.insert(Principal.fromText(userId), newUser);

            return Ok(newUser);
        }
    ),
    createEvent: update([text, text], Event, (tipoEvento, lugarEvento) => {
        const id = generateId();
        const event: Event = {
            id:id,
            tipoEvento: tipoEvento,
            lugarEvento: lugarEvento,
        };

        events.insert(event.id, event);

        return event;
    }),
    readEvents: query([], Vec(Event), () => {
        return events.values();
    }),
    readEventsByZone: query([text], Opt(Event), (lugarEvento) => {
        return events.get(Principal.fromText(lugarEvento));
    }),
    createPago: update([text], Pago, (cuenta) => {
        const id = generateId();
        const pago: Pago = {
            id:id,
            cuenta: cuenta,
        };

        pagos.insert(pago.id, pago);

        return pago;
    }),
    readPagos: query([], Vec(Pago), () => {
        return pagos.values();
    }),
    readPagosById: query([text], Opt(Pago), (id) => {
        return pagos.get(Principal.fromText(id));
    }),
    deletePago: update([text], Result(Pago, AplicationError), (id) => {
        const PagoOpt = pagos.get(Principal.fromText(id));

        if ('None' in PagoOpt) {
            return Err({
                UserDoesNotExist: id
            });
        }

        const pago = PagoOpt.Some;
        pagos.remove(pago.id);
        return Ok(pago);
    })
})

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}