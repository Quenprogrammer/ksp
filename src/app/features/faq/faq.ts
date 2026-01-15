import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
interface FAQ {
  question: string;
  answer: string;
  open: boolean;
}

interface Section {
  label: string;
  value: string;
  faqs: FAQ[];
}

@Component({
  selector: 'app-faq',
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  activeSection: string = 'Payments';

  sections: Section[] = [
    {
      label: 'Payments ',
      value: 'Payments',
      faqs: [
        { question: 'What Payment Method Are Accepted?', answer: 'We accept a variety of payment methods including:\n' +
            '\n' +
            ' \n' +
            '\n' +
            '• Pay on Delivery allows you to pay for your orders upon delivery using the Jumia Pay on Delivery payment method.\n' +
            '\n' +
            '• JumiaPay accepts payment through Mastercard, Visa, or Verve cards, as well as bank transfer, or card payment.\n' +
            '\n' +
            '• Buy Now Pay Later (BNPL) allows you to buy now and pay later with Easy Buy payment option at checkout.\n' +
            '\n' +
            '• Mobile Money enjoy the convenience of paying with or without your wallet using options like Opay and PalmPay at checkout.\n' +
            ' \n' +
            '• Vouchers allow you to pay using a voucher code..', open: false },
        { question: 'How Secure Is My Payment Information?', answer: 'Jumia prioritizes customer payment security with encryption, and secure servers. Regular monitoring and auditing are also performed to maintain a secure environment for transactions..', open: false },
        { question: 'How Do I do If My Payment Is Declined?', answer: 'If your payment is declined, you can check the following to resolve the issue:\n' +
            '\n' +
            '• Check the  spelling and billing information you entered for accuracy.\n' +
            '\n' +
            '• Ensure that your credit card has sufficient funds or that your bank account has enough balance.\n' +
            '\n' +
            '• Check if there are any restrictions on your card, such as a daily spending limit.\n' +
            '\n' +
            '• Make sure your card has not expired.\n' +
            '\n' +
            ' \n' +
            '\n' +
            'If you\'ve checked the above and your payment is still declined, you can contact Jumia customer service for assistance via our livechat.\n' +
            '\n' +
            'Note: It is recommended to keep the details of the error message that appears during the declined transaction to provide to Jumia customer service for a faster resolution..', open: false },
        { question: 'Can I Pay Cash On Delieery For My Payment?', answer: 'It is advisable to pay for your order using JumiaPay on Delivery via bank transfer, as it offers a more convenient and hassle-free experience..', open: false },
      ]
    },
    {
      label: 'Voucher',
      value: 'Voucher',
      faqs: [
        { question: 'Pay On Delivery?', answer: 'You can pay for your orders upon delivery using the Jumia Pay on Delivery payment method..', open: false },
        { question: 'Jumia Pay?', answer: 'You can securely pay for your order on Jumia using Mastercard, Visa, or Verve cards, as well as bank transfer, or card payment.\n' +
            '\n' +
            ' .', open: false },
        { question: 'Buy Now Pay Later?', answer: 'Did you know you can buy now and pay later using our convenient payment options? Take advantage of Easy Buy at checkout. For more information, visit this link..', open: false },
        { question: 'Mobile Money?', answer: 'You can effortlessly pay for your orders using Opay or PalmPay at checkout, ensuring a smooth and worry-free experience. \n' +
            '\n' +
            'For more information, visit this link.\n' +
            ' .', open: false },
      ]
    },
    {
      label: 'Delivery',
      value: 'Delivery',
      faqs: [
        { question: 'When Will My Order Will Be Delivered?', answer: 'Your order will be delivered on or before the delivery date stipulated at the checkout page and in the confirmation email sent. To learn more about our delivery timeline, click here.', open: false },
        { question: 'How Can I track My delivery?', answer: 'To check the delivery status of your order, you can follow these steps:\n' +
            '\n' +
            'Step 1: Log in to your account.\n' +
            '\n' +
            'Step 2: Click on the "My Account" button and select "ORDERS" from the dropdown menu.\n' +
            '\n' +
            'Step 3: Locate the order for which you want to check the delivery status and click on the "See Details" button.\n' +
            '\n' +
            'Step 4: On the order details page, you will be able to see the delivery status under the "Order Information" section. The delivery status will indicate if the order has been shipped, is in transit, or has been delivered.\n' +
            '\n' +
            'Step 5: If the delivery status is "Shipped," you can click on the "Track Package" button to view the delivery tracking information.\n' +
            '\n' +
            'Step 6: If you have any concerns about the delivery status, you can contact Jumia\'s customer service team by clicking on the "Help" button at the top right of the page and selecting "Live Chat" from the dropdown menu.\n' +
            '\n' +
            ' \n' +
            '\n' +
            'Note: When you place an order, you are provided with a delivery timeline. \n' +
            '\n' +
            'On the day of delivery, the delivery agent will also call you.', open: false },
        { question: 'What If I am Not Available to receive my order?', answer: 'If you are not available to receive your delivery, you have the following options:\n' +
            '\n' +
            '• Contact the delivery agent to reschedule the delivery for a more convenient time. (Note that the item can only be kept for a limited time before it is canceled as failed delivery).\n' +
            '\n' +
            '• If you are unable to arrange for an alternative delivery, you can contact our customer service team to request a rescheduling of the delivery. You can reach them by clicking on the "Help" button at the top right of the page and selecting "Live Chat" from the drop down menu.\n' +
            '\n' +
            'Note: It is not possible to change the delivery address once an order is placed. Jumia will make a total of 3 attempts to deliver the package before canceling your order. You will be notified before they make the second attempt, so it\'s important to remain available to avoid order cancellation.', open: false },
        { question: 'What is the delivery fee?', answer: 'The delivery fee is the cost incurred by Jumia and its logistics partners for delivering your order to the selected address. The delivery fee amount can vary based on factors such as your geographic location, the delivery method chosen, the shipment method, and the size or category of the product ordered. You can review the delivery fee before placing your order on the product page and during the checkout process..', open: false },
      ]
    },
    {
      label: 'Return & Refunds',
      value: 'Return & Refunds',
      faqs: [
        { question: 'What Is The Return Policy?', answer: 'Jumia accepts returns for ALL eligible items within 7 days after delivery. To be eligible for a return, the product must be in its original condition and packaging, with all accessories and tags still intact.\n' +
            '\n' +
            'It\'s important to note that some categories, such as those related to personal hygiene, may not be eligible for return. \n' +
            '\n' +
            'You may review the full returns and refund policy HERE..', open: false },
        { question: 'How do i initiate a return online?', answer: 'Step 1: Log in to your Jumia account and go to Orders.\n' +
            '\n' +
            'Step 2: Click on the order of the item(s) you want to return.\n' +
            '\n' +
            'Step 3: Select the item(s) you want to return and provide a reason for the return. Give more details to help us understand the issue.\n' +
            '\n' +
            'Step 4: Choose your preferred refund method.\n' +
            '\n' +
            'Step 5: Select your preferred pickup station.\n' +
            '\n' +
            'Step 6: Review your information and submit your return request..', open: false },
        { question: 'What if i Received a damage item?', answer: 'If you receive a damaged or defective item, you can initiate a return by going to “Orders\'\' in your Jumia account. Jumia will process a refund for the item..', open: false },
        { question: 'How long does it take to process a return?', answer: 'It typically takes 1-8 business days to process a return and refund on Jumia..', open: false },
      ]
    },
    {
      label: 'Products',
      value: 'Products',
      faqs: [
        { question: 'How do i search for specific item?', answer: 'You can search for a specific product on Jumia by using the search bar located at the top of the website. Enter the name of the product you are looking for into the search bar, and then click the \'search\' button. You will be presented with a list of results which match your search criteria. You can then browse through the list to find the exact product you are looking for. Additionally, you can narrow down your search results by selecting filters such as price range, brand and more..', open: false },
        { question: 'How can i view product detail?', answer: 'Product details and specifications for items sold on Jumia can be easily accessed by clicking on the product\'s listing. Once you have selected the desired item, scroll down to the bottom of the page where you will find a detailed description of the product\'s features and specifications. The product\'s details also include a list of images for the product, ratings and reviews from other customers, and a list of related items.', open: false },
        { question: 'How do i know if product is in stock?', answer: 'You can simply visit the product page and look for the "In Stock" label. If the product is currently in stock, you will see the "In Stock" label. If the product is not in stock, the label will not be present. If you need to check the availability of a specific item, you can also use the search bar on the Jumia website. Enter the product name or SKU number to see if it is in stock. If the product is available, you will also see the "In Stock" label on the product page..', open: false },
        { question: 'how can i provide feedback?', answer: 'Just follow these steps: \n' +
            '\n' +
            'Step 1: Go to your account in the top right corner of the main page.\n' +
            '\n' +
            'Step 2: Choose “Pending Reviews”.\n' +
            '\n' +
            'Step 3: Find the item you purchased and select “Write a Review”.\n' +
            '\n' +
            'Step 4: Provide your honest feedback regarding the product and submit it\n' +
            '\n' +
            'Your feedback will be visible to other customers and can help them make informed decisions when purchasing from Jumia..', open: false },
      ]
    },
    {
      label: 'Express',
      value: 'Express',
      faqs: [
        { question: 'What is Express?', answer: 'Jumia Express is a premium delivery service, which offers a fast delivery for eligible products. When you see the Jumia Express badge on a product listing, it means that the item is stored in a Jumia warehouse and is ready for immediate shipment. Orders placed with Jumia Express are processed quickly, and the items are shipped directly from the warehouse to your doorstep/pickup station.', open: false },
        { question: 'How Does Express Work?', answer: 'Jumia Express works by storing eligible products in Jumia’s warehouses for faster order processing. Once an order is placed, the item is directly shipped from the warehouse to your delivery address, ensuring faster, and reliable delivery compared to regular shipping options..', open: false },
        { question: 'What Are The Benefits Of Using Exprss?', answer: 'Jumia Express guarantees express delivery. Each product is packaged meticulously by Jumia, who validates it with outstanding quality control. Jumia Express processes orders swiftly and products are delivered straight to your door or a pickup station after leaving the warehouse. Find the benefits below:\n' +
            '\n' +
            '• Fast delivery\n' +
            '\n' +
            '• Quality product assured..', open: false },
        { question: 'Is Express Available ForAll Products?', answer: 'No, Jumia Express is not available for all products. .', open: false },
      ]
    },
    {
      label: 'Sell On',
      value: 'Sell on',
      faqs: [
        { question: 'How Do i Become A Marketplace Seller ?', answer: 'To become a Jumia Marketplace seller, you need to register as a vendor on the Jumia website, submit your product catalog, and start selling..', open: false },
        { question: 'What Kind Of Products Can I Sell on Marketplace?', answer: 'You can sell a wide range of products, including fashion, electronics, home and appliances, health and beauty, and many others..', open: false },
        { question: 'Is It Free To Sell On Marketplace?', answer: 'Opening a store on Jumia is absolutely free. You can open a store at any time and start selling as quickly as you can upload your products online; though there are fees and commissions for delivered products.\n' +
            '\n', open: false },
        { question: 'How Do I List My Products On Marketplace?', answer: 'To list your products on Jumia Marketplace, you need to create a seller account, complete the new seller training, provide product details, and upload product images.\n' +
            '\n', open: false },
      ]
    },
    {
      label: 'PickUp Station',
      value: 'PickUp Station',
      faqs: [
        { question: 'What Is A PickUp Station?', answer: 'A Pickup Station is a physical location where goods are ordered online and can be picked up. They are usually located in easily accessible locations and makes it convenient for shoppers to collect their orders without having to wait at home for a delivery.\n' +
            '\n.', open: false },
        { question: 'Is the PickUp Shipping Fee Cheaper Than Door Delivery?', answer: 'Yes, to pick up an item at the pickup station it is cheaper than a door delivery method.\n' +
            '\n', open: false },
        { question: 'Will My Order Be delayed When I Choose A PickUp Station?', answer: 'When you select a pickup station, you will receive a notification via Email, Inbox, SMS, and Push Notification regarding the delivery timeline on when to expect your order and it allows shoppers to collect their orders at a time that is convenient for them, rather than waiting for a delivery during a specific time window.\n' +
            '\n.', open: false },
        { question: 'How Do I Select the Nearest PickUp Station To My Location', answer: 'At the point of selecting your preferred delivery method while placing an order, please follow the steps below:\n' +
            '\n' +
            ' \n' +
            '\n' +
            ' 1. Select Pickup station\n' +
            '\n' +
            ' 2. Click on Change\n' +
            '\n' +
            ' 3. Select your region and browse through the cities close to you and confirm the pickup address that pops up.\n' +
            '\n' +
            ' 4. Click on Select Pickup Station.\n' +
            '\n' +
            '\n' +
            'Also, please click here to check the various pickup stations available.\n' +
            '\n.', open: false },
      ]
    },
    {
      label: 'Account',
      value: 'Account',
      faqs: [
        { question: 'How Do I Create An Account?', answer: 'Creating an account on Jumia is easy and only takes a few steps. \n' +
            '\n' +
            'Step 1: Visit the Jumia website\n' +
            '\n' +
            'Step 2: Click on the “My Account” option at the top right corner of the page and you will be directed to the registration page. \n' +
            '\n' +
            'Step 3:  Here, you will be asked to enter a valid email address or phone number to login or create an account with a secure password and click on continue. Once you have filled out the required details, click on the “Create Account” button at the bottom of the page. Additionally, you can choose to login with Facebook or Google. \n' +
            '\n' +
            'Step 4: Your Jumia account is now created and you can start shopping. If you have any other questions or need help, you can contact Jumia’s customer service team for assistance.\n' +
            '\n' +
            ' \n' +
            '\n.', open: false },
        { question: 'How Do i Change My Account Information?', answer: '\n' +
            'Account\n' +
            'How do I change my account information?\n' +
            '\n' +
            'If you need to change any information on your Jumia account, you can do so by following these steps: \n' +
            '\n' +
            'Step 1: Log in to your Jumia account. \n' +
            '\n' +
            'Step 2: Go to the "My Account" page and select "Edit Profile" from the menu.\n' +
            '\n' +
            'Step 3: Here, you can update and change your personal information, contact details, and password.\n' +
            '\n' +
            'Step 4: When you\'re satisfied with the changes, click "Save" to confirm the changes..', open: false },
        { question: 'How Do I Reset My Password?', answer: '\n' +
            'Account\n' +
            'How do I reset my password?\n' +
            '\n' +
            'You can reset your password by following these steps:\n' +
            '\n' +
            'Step 1: First, go to the Jumia website, and click on the “Sign in” button.\n' +
            '\n' +
            'Step 2: Then, click on the “Forgot Password”\n' +
            '\n' +
            'Step 3: We will send a 4-digit verification code to your email.\n' +
            '\n' +
            'Step 4: Once you get the code by email please insert the code on Jumia platform.\n' +
            '\n' +
            'Step 5: You will then be able to submit your password reset and use your new password.', open: false },
        { question: 'How Do I Close My Account?', answer: '\n' +
            'Account\n' +
            'How do I close my Jumia account?\n' +
            '\n' +
            'We regret to see you go, but we understand if you need to close your Jumia account. As an alternative, you can place your account on hold for later use. If you still choose to close your account, here\'s how:\n' +
            '\n' +
            'Step 1: Log in to your Jumia account\n' +
            '\n' +
            'Step 2: Click on the ‘Account’ menu option in the upper right corner\n' +
            '\n' +
            'Step 3: Select ‘Close Account’\n' +
            '\n' +
            'Step 4: Indicate the reason for closing and click on \'Close my account\'\n' +
            '\n' +
            'Note: Once you submit your request, your account cannot be reactivated.\n' +
            '\n' +
            '\n' +
            'Steps to close your account via the App:\n' +
            '\n' +
            'Step 1: Login to your account\n' +
            '\n' +
            'Step 2: Click on "Account” menu option at the lower right corner\n' +
            '\n' +
            'Step 3: Select “Close Account” \n' +
            '\n' +
            'Step 4: Indicate the reason for closing and click on "Close my account"\n' +
            '\n' +
            'Note: Once you submit your request, your account cannot be reactivated..', open: false },
      ]
    },
    /*{
      label: 'Section 10',
      value: 'section10',
      faqs: [
        { question: 'Q1: How to do task 1?', answer: 'Answer 1 for Section 10.', open: false },
        { question: 'Q2: How to do task 2?', answer: 'Answer 2 for Section 10.', open: false },
        { question: 'Q3: How to do task 3?', answer: 'Answer 3 for Section 10.', open: false },
        { question: 'Q4: How to do task 4?', answer: 'Answer 4 for Section 10.', open: false },
      ]


    },*/

  ];

  openSection(sectionValue: string) {
    this.activeSection = sectionValue;
  }

  toggleFAQ(sectionIndex: number, faqIndex: number) {
    this.sections[sectionIndex].faqs[faqIndex].open = !this.sections[sectionIndex].faqs[faqIndex].open;
  }
}
