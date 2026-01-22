import {Component, inject, OnInit} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-events-restore',
  imports: [CommonModule,RouterLink],
  templateUrl: './events-restore.component.html',
  styleUrl: './events-restore.component.css'
})
export class EventsRestoreComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);

  // 🔹 Observables to VIEW collections
  recipes$!: Observable<any[]>;
  cookBooks$!: Observable<any[]>;

  // Your data (used for adding)
  recipes = [
    {
      image: 'assets/img/home/grocery/recipes/01.jpg',
      title: 'Garden salad with a mix of lettuce, cucumber and tomato',
      time: '30 min',
      level: 'Easy',
      portions: '4 por'
    },
    {
      image: 'assets/img/home/grocery/recipes/02.jpg',
      title: 'Raspberry fresh lemonade with lemon, strawberry syrup and mint',
      time: '50 min',
      level: 'Hard',
      portions: '8 por'
    },
    {
      image: 'assets/img/home/grocery/recipes/03.jpg',
      title: 'Penne pasta with spinach and zucchini in a creamy sauce',
      time: '25 min',
      level: 'Easy',
      portions: '2 por'
    }
  ];

  cookBook = {
    image: 'assets/img/home/grocery/recipes/book-cover.jpg',
    badge: 'Cookbook',
    title: 'The Best in Gastronomy',
    author: 'Dana Chambers',
    description:
      'An exquisite cookbook that takes readers on a culinary journey around the world.',
    price: '$12.40'
  };

  ngOnInit() {
    this.loadCollections();
  }

  // 🔹 VIEW all documents
  loadCollections() {
    const recipesRef = collection(this.firestore, 'recipes');
    this.recipes$ = collectionData(recipesRef, { idField: 'id' });

    const cookBooksRef = collection(this.firestore, 'cookBooks');
    this.cookBooks$ = collectionData(cookBooksRef, { idField: 'id' });
  }

  // 🔹 ADD data
  async addRecipesAndCookBook() {
    try {
      const recipesCollection = collection(this.firestore, 'recipes');
      for (const recipe of this.recipes) {
        await addDoc(recipesCollection, {
          ...recipe,
          createdAt: new Date()
        });
      }

      const cookBookCollection = collection(this.firestore, 'cookBooks');
      await addDoc(cookBookCollection, {
        ...this.cookBook,
        createdAt: new Date()
      });

      console.log('All data added successfully!');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  }

  // 🔴 DELETE recipe
  async deleteRecipe(id: string) {
    try {
      await deleteDoc(doc(this.firestore, 'recipes', id));
      console.log('Recipe deleted:', id);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  }

  // 🔴 DELETE cookbook
  async deleteCookBook(id: string) {
    try {
      await deleteDoc(doc(this.firestore, 'cookBooks', id));
      console.log('CookBook deleted:', id);
    } catch (error) {
      console.error('Error deleting cookbook:', error);
    }
  }
}
