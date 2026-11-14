import java.util.*;

class MenuItem {
    private String name;
    private double price;

    MenuItem(String n, double p) {
        name = n;
        price = p;
    }

    String getName() { return name; }
    double getPrice() { return price; }
}

class Order {
    private int orderID;
    private String orderDate;
    private double totalAmount = 0;
    private List<MenuItem> items = new ArrayList<>();

    static int totalOrders = 0;

    Order(int id, String date, MenuItem item) {
        orderID = id;
        orderDate = date;
        totalOrders++;
        addMenuItem(item);
    }

    void addMenuItem(MenuItem item) {
        items.add(item);
        totalAmount += item.getPrice();
    }

    void displayOrder() {
        System.out.println("Order ID: " + orderID);
        System.out.println("Date: " + orderDate);
        System.out.print("Items: ");

        for (MenuItem m : items)
            System.out.print(m.getName() + " ");

        System.out.println("\nTotal: " + totalAmount);
    }
}

class Customer {
    private int custid;
    private String name;
    private String email;
    private List<Order> orders = new ArrayList<>();

    Customer(int id, String n, String e) {
        custid = id;
        name = n;
        email = e;
    }

    void placeOrder(Order o) {
        orders.add(o);
    }

    void displaySummary() {
        System.out.println("Customer: " + name);

        for (Order o : orders) {
            o.displayOrder();
            System.out.println();
        }

        System.out.println("Total orders: " + Order.totalOrders);
    }
}

public class resturant {
    public static void main(String[] args) {
        Customer c = new Customer(
            101, "Rahim", "rahim@example.com"
        );

        MenuItem burger = new MenuItem("Burger", 350);
        MenuItem fries = new MenuItem("Fries", 120);
        MenuItem pizza = new MenuItem("Pizza", 650);

        Order o1 = new Order(1001, "2025-06-10", burger);
        o1.addMenuItem(fries);

        Order o2 = new Order(1002, "2025-06-11", pizza);

        c.placeOrder(o1);
        c.placeOrder(o2);

        c.displaySummary();
    }
}