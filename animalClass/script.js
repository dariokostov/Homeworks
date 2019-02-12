class Animal {
    constructor(name, type, age, size) {
        this.name = name;
        this.type = type;
        this.age = age;
        this.size = size;
        this.isEaten = false;
    }

    get type() {
        return this._type;
    }
    set type(type) {
        if (type === "carnivore" || type === "herbivore" || type === "omnivore") {
            this._type = type;
            return;
        } else {
            throw new Error("Error");
        }
    }

    eat(food) {
        if(food.name.toLowerCase() === this.name.toLowerCase()){
            console.log(`The ${food.name} doesn't eat ${this.name}`)
            return
        }
        if (food instanceof Animal && food.isEaten === false) {
            if (this._type === "herbivore") {
                console.log(`The animal ${this.name} is a herbivore and does not eat other animals`)
                return
            } else {
                if (food.size > this.size * 2) {
                    console.log(`The animal ${this.name} tried to eat the ${food.name} but it was too large.`);
                    return
                } else {
                    console.log(`The animal ${this.name} is ${this._type} and ate the ${food.name}.`)
                    food.isEaten = true;
                    return
                }
            }
        }
        if (food.isEaten === true){
            console.log(`${food.name} already eaten`)
        }
    }
}

class Lion extends Animal {
    constructor(age, size, huntingSkill, isKingOfTheJungle) {
        super("Lion", "carnivore", age, size);
        this.huntingSkill = huntingSkill;
        this.isKingOfTheJungle = isKingOfTheJungle;
    }
    get isKingOfTheJungle() {
        return this._isKingOfTheJungle
    }
    set isKingOfTheJungle(isKingOfTheJungle) {
        if (isKingOfTheJungle === true || isKingOfTheJungle === false) {
            this._isKingOfTheJungle = isKingOfTheJungle;
        } else {
            throw new Error(`is not boolean`);
        }
    }

    get huntingSkill() {
        return this._huntingSkill;
    }
    set huntingSkill(huntingSkill) {
        if (huntingSkill > 0 && huntingSkill < 11) {
            this._huntingSkill = huntingSkill;
            return;
        } else {
            throw new Error(`Must be 1 to 10`);
        }
    }

    hunt(input) {
        setTimeout(() => {
            if (input instanceof Animal) {
                if (this._isKingOfTheJungle === true) {
                    this.eat(input);
                    return;
                }
                let skill = Math.round(Math.random() * 10)
                console.log(`Input skill: ${skill}`)
                if (this._isKingOfTheJungle === false) {
                    if (skill <= this._huntingSkill) {
                        this.eat(input);
                        return;
                    }
                }
                if (skill > this._huntingSkill) {
                    console.log("The Lion didn't catch it's prey");
                    return;
                }
            }
            console.log(`The Lion can't hunt ${input}`)
        }, 5000);
    }
}

class Rabbit extends Animal {
    constructor(age, size, speed) {
        super("rabbit", "herbivore", age, size);
        this.speed = speed;
    }
    get size(){
        return this._size * this._speed;
    }
    set size(size){
        return this._size = size;
    }

    get speed() {
        return this._speed;
    }
    set speed(speed) {
        if (speed > 0 && speed < 11) {
            this._speed = speed;
            return;
        } else {
            throw new Error(`The speed must be 1 to 10`);
        }
    }
}

let mirka = new Animal("pig", "herbivore", 12, 30);
let petar = new Animal("mouse", "carnivore", 23, 10);
let viktor = new Animal("lion", "omnivore", 23, 45);
let dario = new Rabbit(3, 2, 7);
let martin = new Lion(6, 20, 9, false);
let goran = new Lion(6, 20, 5, true);

mirka.eat(dario);
martin.hunt(petar);
goran.hunt(dario);
dario.eat(goran);
dario.eat(dario);
