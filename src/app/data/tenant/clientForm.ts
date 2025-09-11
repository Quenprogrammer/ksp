interface clientForm{placeHolder:string; name:string; type:string;}
interface options{
  name:string;
  value:string;
}
export const clientsForm:clientForm[]=[
  {name:'fullName', placeHolder:'Full Name', type:'text'},
  {name:'email', placeHolder:'Email', type:'email'},
  {name:'phone', placeHolder:'Phone',type:'tel'},
  {name:'address', placeHolder:'Address',type:'text'},
  {name:'dateOfBirth', placeHolder:'Date of birth', type:'text'},
  {name:'nationality', placeHolder:'Nationally',type:'text'},
  {name:'stateOfOrigin', placeHolder:'State of origin',type:'text'},
  {name:'lga', placeHolder:'LGA', type:'text'},
  {name:'occupation', placeHolder:'Occupation',type:'text'},
  {name:'educationLevel', placeHolder:'Education Level',type:'text'},
  {name:'idNumber', placeHolder:'id Number',type:'number'},
  {name:'emergencyContactName', placeHolder:'Emergency Contact Name',type:'text',},
  {name:'emergencyContactPhone', placeHolder:'Emergency Contact Phone',type:'text'},
  {name:'nextOfKin', placeHolder:'Next of Kin',type:'text'},
  {name:'nextOfKinRelationship', placeHolder:'Relationship to Next of Kin',type:'text'},
  {name:'accountNumber', placeHolder:'Account Number',type:'text'},
  {name:'bvn', placeHolder:'BVN',type:'text'},
  {name:'accountName', placeHolder:'Account Name',type:'text'},
  {name:'bankName', placeHolder:'Bank Name',type:'text'},
  {name:'photoUrl', placeHolder:'photoUrl',type:'text'},
]

export const genderOptions:options[]=[
  {name:'Select Gender', value:''},
  {name:'Male', value:'male'},
  {name:'Female', value:'female'},
  {name:'Others', value:'others'}
]
export const maritalStatus:options[]=[
  {name:'Select Marital Status', value:''},
  {name:'Single', value:'single'},
  {name:'Divorce', value:'divorce'},
  {name:'Married', value:'married'},
  {name:'Widow', value:'widow'},
]

export const idOption:options[]=[
  {name:'Select Options', value:''},
  {name:'National ID card', value:'national ID card'},
  {name:'Voters Card', value:'voters card'},
  {name:'Passport', value:'passport'},
  {name:'Driver’s License', value:'driver’s license'},
]

export const navLink=[
  {name:'Overview', link:'', class:'nav-link active' },
  {name:'Subscribers', link:'', class:'nav-link disabled'},
  {name:'Status', link:'', class:'nav-link disabled'},
  {name:'Actions', link:'', class:'nav-link disabled'},

]
