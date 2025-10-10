import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Country {
  id?: string;
  name: string;
  code: string;
}

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgForOf, AsyncPipe],
  templateUrl: './country.html',
  styleUrls: ['./country.css']
})
export class CountryComponent implements OnInit {
  countryForm!: FormGroup;
  countries$!: Observable<Country[]>;
  loading = false;

  constructor(private fb: FormBuilder, private firestore: Firestore) {}

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]]
    });

    const countryCollection = collection(this.firestore, 'countries');
    this.countries$ = collectionData(countryCollection, { idField: 'id' }) as Observable<Country[]>;
  }

  async addCountry() {
    if (this.countryForm.invalid) return;
    this.loading = true;

    const countryData = this.countryForm.value;
    try {
      const ref = collection(this.firestore, 'countries');
      await addDoc(ref, {
        name: countryData.name,
        code: countryData.code.toUpperCase()
      });
      this.countryForm.reset();
    } catch (error) {
      console.error('Error adding country:', error);
    } finally {
      this.loading = false;
    }
  }

  async deleteCountry(id: string) {
    if (!confirm('Are you sure you want to delete this country?')) return;

    try {
      const docRef = doc(this.firestore, `countries/${id}`);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  }
}
