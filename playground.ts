interface Person {
  name: string;
  age: number;
}

export function Play(): void {
  const random: string | number[] = Math.random() > 0.5 ? "hello" : [1, 2];

  if (typeof random === "string") {
    const upper = random.toUpperCase();
  } else {
    console.log(random);
  }

  type Car = {
    geschw?: number;
  };
  type raceCar = {
    color: string;
  } & Car;
  const testfahrzeug: raceCar = {
    color: "blue",
    geschw: 100,
  };
  interface Person {
    age: number;
  }
  interface testtest {
    age: string;
  }
  interface Studend extends Person {
    name: string;
  }

  type StudentInfo = {
    wert: number;
  };
  const x: number[] = [1, 2];
  const hallo: StudentInfo = { wert: 1 };

  console.log(random.length);
}
