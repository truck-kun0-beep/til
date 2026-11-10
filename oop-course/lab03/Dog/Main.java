class Dog {
    private String name;
    private String breed;

    public Dog(String name, String breed) {
        this.name = name;
        this.breed = breed;
    }

    public String getName() {
        return name;
    }

    public String getBreed() {
        return breed;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d1 = new Dog("Tommy", "Bulldog");
        Dog d2 = new Dog("Bruno", "Labrador");

        System.out.println(d1.getName() + ", " + d1.getBreed());
        System.out.println(d2.getName() + ", " + d2.getBreed());

        d1.setName("Max");
        d1.setBreed("German Shepherd");
        d2.setName("Rocky");
        d2.setBreed("Pug");

        System.out.println("Update:");
        System.out.println(d1.getName() + ", " + d1.getBreed());
        System.out.println(d2.getName() + ", " + d2.getBreed());
    }
}
