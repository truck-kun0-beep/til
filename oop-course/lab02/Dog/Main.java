class Dog {
    String name;
    String breed;

    Dog(String name, String breed) {
        this.name = name;
        this.breed = breed;
    }

    void setName(String name) {
        this.name = name;
    }

    void setBreed(String breed) {
        this.breed = breed;
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d1 = new Dog("Bolt", "Giant");
        Dog d2 = new Dog("Luna", "Blue");

        System.out.println(d1.name + ", " + d1.breed);
        System.out.println(d2.name + ", " + d2.breed);

        d1.setName("Max");
        d1.setBreed("Tank");
        d2.setName("Mike");
        d2.setBreed("Butcher");

        System.out.println();
        System.out.println("Updated:");
        System.out.println(d1.name + ", " + d1.breed);
        System.out.println(d2.name + ", " + d2.breed);
    }
}
