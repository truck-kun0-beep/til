import java.util.ArrayList;
import java.util.List;

class Customer {
    private int custid;
    private String name;
    private String email;
    private List<Order> orders = new ArrayList<>();

    public Customer(int custid, String name, String email) {
        this.custid = custid;
        this.name = name;
        this.email = email;
    }

    public void placeOrder(Order order) {
        if (order == null) {
            throw new IllegalArgumentException("Order cannot be null");
        }

        orders.add(order);
    }

    public void displaySummary() {
        System.out.println("Customer: " + name);
        System.out.println("Customer ID: " + custid);
        System.out.println("Email: " + email);

        for (Order o : orders) {
            o.displayOrder();
        }

        System.out.println(
            "Total orders so far: " + Order.getTotalOrders()
        );
    }
}

class Order {
    private int orderID;
    private String orderDate;
    private double totalAmount;
    private List<MenuItem> menuItems = new ArrayList<>();

    private static int totalOrders = 0;

    public Order(int orderID, String orderDate, MenuItem firstItem) {
        if (firstItem == null) {
            throw new IllegalArgumentException(
                "An order must contain at least one menu item"
            );
        }

        this.orderID = orderID;
        this.orderDate = orderDate;

        menuItems.add(firstItem);
        calculateTotal();

        totalOrders++;
    }

    public void addMenuItem(MenuItem item) {
        if (item == null) {
            throw new IllegalArgumentException(
                "Menu item cannot be null"
            );
        }

        menuItems.add(item);
        calculateTotal();
    }

    public double calculateTotal() {
        totalAmount = 0;

        for (MenuItem item : menuItems) {
            totalAmount += item.getPrice();
        }

        return totalAmount;
    }

    public void displayOrder() {
        System.out.println();
        System.out.println("Order ID: " + orderID);
        System.out.println("Order Date: " + orderDate);

        System.out.print("Items: ");

        for (int i = 0; i < menuItems.size(); i++) {
            if (i > 0) {
                System.out.print(", ");
            }

            System.out.print(menuItems.get(i).getName());
        }

        System.out.println();
        System.out.printf("Total amount: %.2f%n", totalAmount);
    }

    public static int getTotalOrders() {
        return totalOrders;
    }
}

class MenuItem {
    private String name;
    private double price;

    public MenuItem(String name, double price) {
        if (name == null || name.isEmpty() || price < 0) {
            throw new IllegalArgumentException("Invalid menu item");
        }

        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
}

public class resturant {
    public static void main(String[] args) {
        Customer customer = new Customer(
            101, "Rahim", "rahim@example.com"
        );

        // First order: Burger and Fries
        MenuItem burger = new MenuItem("Burger", 350.0);
        MenuItem fries = new MenuItem("Fries", 120.0);

        Order order1 = new Order(
            1001, "2025-06-10", burger
        );
        order1.addMenuItem(fries);

        // Second order: Pizza
        MenuItem pizza = new MenuItem("Pizza", 650.0);

        Order order2 = new Order(
            1002, "2025-06-11", pizza
        );

        customer.placeOrder(order1);
        customer.placeOrder(order2);

        customer.displaySummary();
    }
}