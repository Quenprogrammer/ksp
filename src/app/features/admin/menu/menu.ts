import {Component, signal} from '@angular/core';
import {MenuCardHeader} from '../../system/menu-card-header/menu-card-header';
import {RouterLink} from '@angular/router';
import {Modal} from '../../system/modal';
import {SystemInfoComponent} from '../../system/menu-card-header/system-info/system-info.component';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-menu',
  imports: [
    MenuCardHeader,
    RouterLink,
    Modal,
    SystemInfoComponent
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  dataIcons = [
    { name: 'Lock Site', icon: 'adminIcon/data-breach-svgrepo-com.svg',link:''  },
    { name: 'Database', icon: 'adminIcon/data-storage-lock-solid-svgrepo-com.svg' ,link:'' },
    { name: 'Delete Messages', icon: 'adminIcon/data-exchange-interface-symbol-svgrepo-com.svg',link:''  },
    { name: 'Delete Users', icon: 'adminIcon/real-time-data-display-svgrepo-com.svg',link:''  },
    { name: 'Delete Products', icon: 'adminIcon/data-storage-network-solid-svgrepo-com.svg' ,link:''},

  ];
  exportData = [
    { name: 'Dashboard', icon: 'adminIcon/data-drive-flash-plug-usb-svgrepo-com.svg',link:'/dashboard' },
    { name: 'Blog', icon: 'adminIcon/blog.svg',  link:'/adminPost'},
    { name: 'Music', icon: 'adminIcon/mic.svg',  link:'/adminMusic'},
    { name: 'Videos', icon: 'adminIcon/vid.svg',  link:'/adminVideos'},
    { name: 'Photos', icon: 'adminIcon/pic.svg',  link:'/adminPicture'},
    { name: 'Users', icon: 'adminIcon/team.svg', link:'/adminUsers'  },
     { name: 'Sales', icon: 'adminIcon/sales.svg' ,link:'/adminSales' },
    { name: 'Events', icon: 'adminIcon/data-cluster-outline-badged-svgrepo-com.svg', link:'/adminEvents'  },
    { name: 'Reviews', icon: 'adminIcon/reviews.svg' ,link:'' },
    { name: 'Purchase', icon: 'adminIcon/cash.svg' ,link:'/adminPurchase' },
    { name: 'Payout', icon: 'adminIcon/trade.svg' ,link:'/adminPayout' },
    { name: 'Favourite', icon: 'adminIcon/love.svg' ,link:'/adminFavourite' },
    { name: 'Products', icon: 'adminIcon/data-database-eternet-server-storage-svgrepo-com.svg',link:'/adminProducts' },
    { name: 'Messages', icon: 'adminIcon/data-definition-details-svgrepo-com.svg',link:'/adminInbox' },
    { name: 'Settings', icon: 'adminIcon/data-definition-details-svgrepo-com.svg',link:'/adminSettings' },
     { name: 'Report issues', icon: 'adminIcon/problem.svg',link:'/reportIssues'  },

      ];

  width2='900px'

  height2='800px'
  settings = signal(false);

  cloeOthersModal() {
    this.settings.set(false);
  }

  constructor(private firestore: Firestore) {}

  async saveTestDoc() {
    try {
      const docRef = await addDoc(collection(this.firestore, 'testCollection'), {
        name: 'Adamu Salisu',
        age: 25,
        createdAt: new Date()
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}
