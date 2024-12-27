<template>
  <div class="create-container">
    <Navbar />
    <div class="content-box">
      <div class="nav-buttons">
        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 1 }"
          >
            Personal Info
          </button>
        </router-link>

        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 2 }"
          >
            Farm Profile
          </button>
        </router-link>

        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 3 }"
          >
            Farm Profile II
          </button>
        </router-link>
      </div>
      <br>
      <br>
      <div class="top-section">
        <div class="info-box">
          <h1> Name: {{ farmer.surname }}, {{ farmer.first_name }}, {{ farmer.middle_name }}, {{ farmer.extension_name }} </h1>
          <h2>Location: {{ farmer.house_lot_bldg_no_purok }}, {{ farmer.street_sitio_subdv }}, {{ farmer.barangay }}, {{ farmer.municipality_city }}, {{ farmer.region }} </h2>
        </div>
      </div>
      <div class="personal-info-sections">
        <form @submit.prevent="submitForm">
        <div v-if="isHovered === 1" id="personalInfoI" class="personal-info-section">
            <div class="row5">
              <div class="input-field">
                <select v-model="farmer.enrollment_type" required spellcheck="false" class="black-select">
                  <option value="New">New</option>
                </select>
                <label>Enrollment Type:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.reference_number"
                  required
                  spellcheck="false"
                  maxlength="15"
                />
                <label>Reference Number:</label>
              </div>
            </div>
              <div class="row mb-3">
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.surname"
                  required
                  spellcheck="false"
                />
                <label>SURNAME:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.first_name"
                  required
                  spellcheck="false"
                />
                <label>FIRST NAME:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.middle_name"
                  required
                  spellcheck="false"
                />
                <label>MIDDLE NAME:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.extension_name"
                  spellcheck="false"
                  required
                />
                <label>EXTENSION NAME:</label>
              </div>
              <div class="input-field">
                <select v-model="selectedSex" required spellcheck="false" class="black-select">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="Other">Other</option>
              </select>
                <label>GENDER:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="isOtherSexSelected" class="input-field">
                <input type="text" v-model="farmer.sex" spellcheck="false" />
                <label>Please specify your sex:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.house_lot_bldg_no_purok"
                  required
                  spellcheck="false"
                />
                <label>HOUSE/LOT/BLDG/NO.PUROK:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.street_sitio_subdv"
                  required
                  spellcheck="false"
                />
                <label>STREET/SITIO/SUBDV.:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.barangay" required spellcheck="false" class="black-select" >
                  <option value="Alitao">Alitao</option>
                  <option value="Alsam Ibaba">Alsam Ibaba</option>
                  <option value="Alsam Ilaya">Alsam Ilaya</option>
                  <option value="Alupay">Alupay</option>
                  <option value="Angeles Zone I (Poblacion)">Angeles Zone I (Poblacion)</option>
                  <option value="Angeles Zone II">Angeles Zone II</option>
                  <option value="Angeles Zone III">Angeles Zone III</option>
                  <option value="Angeles Zone IV">Angeles Zone IV</option>
                  <option value="Angustias Zone I (Poblacion)">Angustias Zone I (Poblacion)</option>
                  <option value="Angustias Zone II">Angustias Zone II</option>
                  <option value="Angustias Zone III">Angustias Zone III</option>
                  <option value="Angustias Zone IV">Angustias Zone IV</option>
                  <option value="Anos">Anos</option>
                  <option value="Ayaas">Ayaas</option>
                  <option value="Baguio">Baguio</option>
                  <option value="Banilad">Banilad</option>
                  <option value="Ibabang Bukal">Ibabang Bukal</option>
                  <option value="Ilayang Bukal">Ilayang Bukal</option>
                  <option value="Calantas">Calantas</option>
                  <option value="Calumpang">Calumpang</option>
                  <option value="Camaysa">Camaysa</option>
                  <option value="Dapdap">Dapdap</option>
                  <option value="Kanlurang Domoit">Kanlurang Domoit</option>
                  <option value="Silangang Domoit">Silangang Domoit</option>
                  <option value="Gibanga">Gibanga</option>
                  <option value="Ibas">Ibas</option>
                  <option value="Ilasan Ibaba">Ilasan Ibaba</option>
                  <option value="Ilasan Ilaya">Ilasan Ilaya</option>
                  <option value="Ipilan">Ipilan</option>
                  <option value="Isabang">Isabang</option>
                  <option value="Katigan Kanluran">Katigan Kanluran</option>
                  <option value="Katigan Silangan">Katigan Silangan</option>
                  <option value="Lakawan">Lakawan</option>
                  <option value="Lalo">Lalo</option>
                  <option value="Lawigue">Lawigue</option>
                  <option value="Lita">Lita</option>
                  <option value="Malaoa">Malaoa</option>
                  <option value="Masin">Masin</option>
                  <option value="Mate">Mate</option>
                  <option value="Mateuna">Mateuna</option>
                  <option value="Mayowe">Mayowe</option>
                  <option value="Ibabang Nangka">Ibabang Nangka</option>
                  <option value="Ilayang Nangka">Ilayang Nangka</option>
                  <option value="Opias">Opias</option>
                  <option value="Ibabang Palale">Ibabang Palale</option>
                  <option value="Ilayang Palale">Ilayang Palale</option>
                  <option value="Kanlurang Palale">Kanlurang Palale</option>
                  <option value="Silangang Palale">Silangang Palale</option>
                  <option value="Pandakaki">Pandakaki</option>
                  <option value="Pook">Pook</option>
                  <option value="Potol">Potol</option>
                  <option value="San Diego Zone I (Poblacion)">San Diego Zone I (Poblacion)</option>
                  <option value="San Diego Zone II (Poblacion)">San Diego Zone II (Poblacion)</option>
                  <option value="San Diego Zone III">San Diego Zone III</option>
                  <option value="San Diego Zone IV">San Diego Zone IV</option>
                  <option value="San Isidro Zone I (Poblacion)">San Isidro Zone I (Poblacion)</option>
                  <option value="San Isidro Zone II">San Isidro Zone II</option>
                  <option value="San Isidro Zone III">San Isidro Zone III</option>
                  <option value="San Isidro Zone IV">San Isidro Zone IV</option>
                  <option value="San Roque Zone I (Poblacion)">San Roque Zone I (Poblacion)</option>
                  <option value="San Roque Zone II">San Roque Zone II</option>
                  <option value="Talolong">Talolong</option>
                  <option value="Tamlong">Tamlong</option>
                  <option value="Tongko">Tongko</option>
                  <option value="Valencia">Valencia</option>
                  <option value="Wakas">Wakas</option>
                </select>
                <label>BARANGAY:</label>
                <span class="arrow-down"></span>
              </div>
              <div class="input-field">
                <select v-model="farmer.municipality_city" required spellcheck="false" class="black-select">
                  <option value="Tayabas City">Tayabas City</option>
                </select>
                <label>MUNICIPALITY/CITY:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.province" required spellcheck="false" class="black-select">
                  <option value="Quezon Province">Quezon Province</option>
                </select>
                <label>PROVINCE:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.region" required spellcheck="false" class="black-select">
                  <option value="IV-A">IV-A</option>
                </select>
                <label>Region:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.mobile_number"
                  required
                  spellcheck="false"
                  maxlength="10"
                />
                <label>MOBILE NUMBER:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.landline_number"
                  required
                  spellcheck="false"
                  maxlength="10"
                />
                <label>LANDLINE NUMBER:</label>
              </div>
              <div class="input-field">
                <input
                  type="date"
                  v-model="farmer.date_of_birth"
                  spellcheck="false"
                />
                <label>DATE OF BIRTH:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.place_of_birth"
                  required
                  spellcheck="false"
                />
                <label>PLACE OF BIRTH:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.place_of_birth_province_state"
                  required
                  spellcheck="false"
                />
                <label>Province/State:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.place_of_birth_country"
                  required
                  spellcheck="false"
                />
                <label>Country:</label>
              </div>
              <div class="input-field">
                <select v-model="selectedReligion" required spellcheck="false" class="black-select" >
                  <option value="christianity">Christianity</option>
                  <option value="islam">Islam</option>
                  <option value="Other">Other</option>
                </select>
                <label>RELIGION:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="isOtherSelected" class="input-field">
                <input
                  type="text"
                  v-model="farmer.religion"
                  spellcheck="false"
                />
                <label>Please specify your religion:</label>
              </div>
              <div class="input-field">
                <select v-model="selectedCivilStatus" required spellcheck="false" class="black-select" >
                  <option value="single">single</option>
                  <option value="married">married</option>
                  <option value="widowed">widowed</option>
                  <option value="separated">separated</option>
                  <option value="Other">Other</option>
                </select>
                <label>CIVIL STATUS:</label>
                <span class="arrow-down"></span>
              </div>
              <div class="input-field" v-if="selectedCivilStatus === 'married'">
                <input
                  type="text"
                  v-model="farmer.name_of_spouse_if_married"
                  spellcheck="false"
                />
                <label>NAME OF SPOUSE IF MARRIED:</label>
              </div>
              <div v-if="isOtherCivilStatusSelected" class="input-field">
                <input
                  type="text"
                  v-model="farmer.civil_status"
                  spellcheck="false"
                />
                <label>Please specify your Civil Status:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.mothers_maiden_name"
                  required
                  spellcheck="false"
                />
                <label>MOTHERS MAIDEN NAME:</label>
              </div>
              <div class="input-field">
              <select v-model="selectedHouseholdHeads" required spellcheck="false" class="black-select" @change="showAdditionalInput = selectedHouseholdHeads === 'yes'">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label>HOUSEHOLD HEADS:</label>
              <span class="arrow-down"></span>
            </div>

            <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="number"
                  v-model="farmer.if_no_name_of_household_heads" 
                  spellcheck="false"
                />
                <label>IF NO. OF HOUSEHOLD HEADS:</label>
              </div>
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="text"
                  v-model="farmer.relationship" 
                  spellcheck="false"
                />
                <label>RELATIONSHIP:</label>
              </div>
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="number"
                  v-model="farmer.no_of_living_household_members" 
                  spellcheck="false"
                />
                <label>NO. OF LIVING HOUSEHOLD MEMBERS:</label>
              </div>
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="number"
                  v-model="farmer.no_of_male" 
                  spellcheck="false"
                />
                <label>NO. OF MALE:</label>
              </div>
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="number"
                  v-model="farmer.no_of_female" 
                  spellcheck="false"
                />
                <label>NO. OF FEMALE:</label>
              </div>
              <div class="input-field">
                <select v-model="selectedHighestFormalEduc" required spellcheck="false" class="black-select" >
                  <option value="pre-school">pre-school</option>
                  <option value="elementary">elementary</option>
                  <option value="high school (non K-12)">high school (non K-12)</option>
                  <option value="junior high school (K-12)">junior high school (K-12)</option>
                  <option value="senior high school (K-12)">senior high school (K-12)</option>
                  <option value="college">college</option>
                  <option value="vocational">vocational</option>
                  <option value="post-graduate">post-graduate</option>
                  <option value="none">none</option>
                  <option value="Other">Other</option>
                </select>
                <label>HIGHEST FORMAL EDUCATION:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="isOtherHighestFormalEduc" class="input-field">
                <input
                  type="text"
                  v-model="farmer.highest_formal_education"
                  spellcheck="false"
                />
                <label>Please specify your Highest Formal Educ.:</label>
              </div>
              <div class="input-field">
              <select v-model="selectedPersonWithDisability" required spellcheck="false" class="black-select">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label>PERSON WITH DISABILITY:</label>
              <span class="arrow-down"></span>
            </div>
            <div class="input-field">
              <select v-model="selectedIVpsBeneficiary" required spellcheck="false" class="black-select">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label>IVps BENEFICIARY:</label>
              <span class="arrow-down"></span>
            </div>
            <div class="input-field">
              <select v-model="selectedMemberOfIndiginousGroup" required spellcheck="false" class="black-select">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label>MEMBER OF INDIGINOUS GROUP:</label>
              <span class="arrow-down"></span>
            </div>
            <div class="input-field" v-if="selectedMemberOfIndiginousGroup === 'yes'">
                <input
                  type="text"
                  v-model="farmer.member_of_an_indiginous_group_if_yes_specify"
                  spellcheck="false"
                />
                <label>SPECIFY YOUR INDIGINOUS GROUP:</label>
              </div>
            <div class="input-field">
                <select v-model="selectedWithGovId" required spellcheck="false" class="black-select" >
                  <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
                <label>WITH GOVERNMENT ID:</label>
                <span class="arrow-down"></span>
              </div>
              <div class="input-field" v-if="selectedWithGovId === 'yes'">
                <input
                  type="text"
                  v-model="farmer.if_yes_specify_id_type"
                  spellcheck="false"
                />
                <label>SPECIFY YOUR ID:</label>
              </div>
              <div class="input-field" v-if="selectedWithGovId === 'yes'">
                <input
                  type="text"
                  v-model="farmer.id_number"
                  spellcheck="false"
                />
                <label>ID NUMBER:</label>
              </div>
              <div class="input-field">
              <select v-model="selectedMemberOfFarmersAssociation" required spellcheck="false" class="black-select">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label>FARMERS' ASSOCIATION MEMBER:</label>
              <span class="arrow-down"></span>
            </div>
            <div class="input-field" v-if="selectedMemberOfFarmersAssociation === 'yes'">
                <input
                  type="text"
                  v-model="farmer.if_yes_spefify_farmers_association"
                  spellcheck="false"
                />
                <label>SPECIFY YOUR FARMERS ASSOCIATION:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.person_to_notify_in_case_of_emergency" 
                  required
                  spellcheck="false"
                />
                <label>EMERGENCY CONTACT PERSON:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.contact_number" 
                  required
                  spellcheck="false"
                  maxlength="10"
                />
                <label>CONTACT NUMBER:</label>
              </div>
            </div>
            <button class="next-button" style="display: block; margin: 0 auto;" @click="changeHover(2)">Next</button>
          </div>
        
        
        <div v-if="isHovered === 2" id="personalInfoIV" class="personal-info-section">
          <div class="row mb-3">
            <h1 style="color: black;">Main Livelihood</h1>
            <nav class="navbar">
            <div class="navbar-content">
              <div class="checkbox-group">
                <div class="checkbox-list">
                  <label>
                    <input type="checkbox" value="farmer" v-model="selectedMainLivelihood" />
                    Farmer
                  </label>
                  <label>
                    <input type="checkbox" value="farmworker/laborer" v-model="selectedMainLivelihood" />
                    Farmworker/Laborer
                  </label>
                  <label>
                    <input type="checkbox" value="fisherfolk" v-model="selectedMainLivelihood" />
                    Fisherfolk
                  </label>
                  <label>
                    <input type="checkbox" value="agri youth" v-model="selectedMainLivelihood" />
                    Agri Youth
                  </label>
                </div>
              </div>
            </div>
          </nav>
          
            <div class="check-box">
              <label class="farming-activity-label">TYPE OF FARMING ACTIVITY:</label>
              <label>
                <input type="checkbox" value="rice" v-model="selectedFarmingActivity" />
                Rice
              </label>
              <label>
                <input type="checkbox" value="corn" v-model="selectedFarmingActivity" />
                Corn
              </label>
              <label>
                <input type="checkbox" value="other_crop" v-model="selectedFarmingActivity" />
                Other crops
              </label>
              <div class="input-field2" v-if="selectedFarmingActivity.includes('other_crop')">
              <div class="input-field2">
                <input
                  type="text"
                  v-model="farmer.other_crop_specify" 
                  spellcheck="false"
                  placeholder="Please Specify"
                />
              </div>
            </div> 
              <label>
                <input type="checkbox" value="livestock" v-model="selectedFarmingActivity" />
                Livestock
              </label>
              <div class="input-field2" v-if="selectedFarmingActivity.includes('livestock')">
              <div class="input-field2">
                <input
                  type="text"
                  v-model="farmer.livestock_specify" 
                  spellcheck="false"
                  placeholder="Please Specify"
                />
              </div>
            </div>
              <label>
                <input type="checkbox" value="poultry" v-model="selectedFarmingActivity" />
                Poultry
              </label>
              <div class="input-field2" v-if="selectedFarmingActivity.includes('poultry')">
              <div class="input-fiel2">
                <input
                  type="text"
                  v-model="farmer.poultry_specify" 
                  spellcheck="false"
                  placeholder="Please Specify"
                />
              </div>
            </div>
              <label>
                <input type="checkbox" value="type_of_farming_activities_other" v-model="selectedFarmingActivity" />
                Other
              </label>
              <div class="input-field2" v-if="selectedFarmingActivity.includes('type_of_farming_activities_other')">
                <div class="input-fiel2">
                  <input
                    type="text"
                    v-model="farmer.type_of_farming_activities_other" 
                    spellcheck="false"
                    placeholder="Other, For Type of Activity"
                  />
                </div>
              </div>
            </div>

            <div class="check-box">
              <label class="farming-activity-label">FOR FARMWORKERS:</label>
              <label>
                <input type="checkbox" value="land preparation" v-model="selectedFarmorker" />
                land preparation
              </label>
              <label>
                <input type="checkbox" value="planting / transplanting" v-model="selectedFarmorker" />
                planting / transplanting
              </label>
              <label>
                <input type="checkbox" value="cultivation" v-model="selectedFarmorker" />
                cultivation
              </label>
              <label>
                <input type="checkbox" value="harvesting" v-model="selectedFarmorker" />
                harvesting
              </label>
              <label>
                <input type="checkbox" value="for_farmworkers_other" v-model="selectedFarmorker" />
                Other, please specify
              </label>
              <div class="input-field2" v-if="selectedFarmorker.includes('for_farmworkers_other')">
              <div class="input-field2">
                <input
                  type="text"
                  v-model="farmer.for_farmworkers_other" 
                  spellcheck="false"
                  placeholder="Other, For Farmworker"
                />
              </div>
            </div>
            </div>

            <div class="check-box">
              <label class="farming-activity-label">FOR FISHERFOLK:</label>
              <label>
                <input type="checkbox" value="fish capture" v-model="selectedFishfolk" />
                fish capture
              </label>
              <label>
                <input type="checkbox" value="aquaculture" v-model="selectedFishfolk" />
                aquaculture
              </label>
              <label>
                <input type="checkbox" value="gleaning" v-model="selectedFishfolk" />
                gleaning
              </label>
              <label>
                <input type="checkbox" value="fish proccessing" v-model="selectedFishfolk" />
                fish proccessing
              </label>
              <label>
                <input type="checkbox" value="fish vending" v-model="selectedFishfolk" />
                fish vending
              </label>
              <label>
                <input type="checkbox" value="for_fishfolk_other" v-model="selectedFishfolk" />
                Other, please specify
              </label>
              <div class="input-field2" v-if="selectedFishfolk.includes('for_fishfolk_other')">
              <div class="input-field2">
                <input
                  type="text"
                  v-model="farmer.for_fishfolk_other" 
                  spellcheck="false"
                  placeholder="Other, For Fishfolk"
                />
              </div>
            </div>
            </div>

            <div class="check-box">
              <label class="farming-activity-label">FOR AGRI YOUTH:</label>
              <label>
                <input type="checkbox" value="part of a farming household" v-model="selectedForAgriYouth" />
                part of a farming household
              </label>
              <label>
                <input type="checkbox" value="attending/attended formal agri-fishery related course" v-model="selectedForAgriYouth" />
                attending/attended formal agri-fishery related course
              </label>
              <label>
                <input type="checkbox" value="attending/attended non-formal agri-fishery related course" v-model="selectedForAgriYouth" />
                attending/attended non-formal agri-fishery related course
              </label>
              <label>
                <input type="checkbox" value="participated in any agricultural activity/program" v-model="selectedForAgriYouth" />
                participated in any agricultural activity/program
              </label>
              <label>
                <input type="checkbox" value="for_agri_youth_other" v-model="selectedForAgriYouth" />
                Other, please specify
              </label>
              <div class="input-field2" v-if="selectedForAgriYouth.includes('for_agri_youth_other')">
              <div class="input-field2">
                <input
                  type="text"
                  v-model="farmer.for_agri_youth_other" 
                  spellcheck="false"
                  placeholder="Other, For Agri Youth"
                  class="input-placeholder-space2"
                />
              </div>
            </div>
            </div>
        </div>
        <div class="button-container">
          <button class="preview-button" @click="changeHover(1)">Preview</button>
          <button class="next-button" @click="changeHover(3)">Next</button>
        </div>
        </div>

        <div v-if="isHovered === 3" id="personalInfoIV" class="personal-info-section">
        <button type="button" @click="addFarmTable" class="add-farm-table-button">
          <i class="fas fa-plus"></i>
        </button>
        <div v-for="(parcel, index) in farmParcels" :key="index" class="table-container" style="color: black;">
          <div class="parcel-header">
            Farm Parcel {{ index + 1 }}
            <button type="button" class="remove-parcel-button" @click="removeFarmTable(index)">x</button>
          </div>
          <br>

          <!-- Parcel Row -->
          <div v-if="parcel.isPreview" class="row1">
            <div class="input-field">
              <input
                type="text"
                v-model="parcel.barangay"
                required
                spellcheck="false"
              />
              <label>Barangay:</label>
            </div>

            <div class="input-field">
              <input
                type="text"
                v-model="parcel.city_municipality"
                required
                spellcheck="false"
              />
              <label>City/Municipality:</label>
            </div>

            <div class="input-field">
              <input
                type="text"
                v-model="parcel.total_farm_area_ha"
                required
                spellcheck="false"
              />
              <label>Total Farm Area:</label>
            </div>
            <div class="input-field">
              <input
                type="text"
                v-model="parcel.ownership_document_no"
                required
                spellcheck="false"
              />
              <label>Ownership Document:</label>
            </div>
            <div class="input-field">
              <select v-model="parcel.with_ancestral_domain" required spellcheck="false" class="black-select" >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label>With Ancestral Domain:</label>
              <span class="arrow-down"></span>
            </div>
            <div class="input-field">
              <select v-model="parcel.agrarian_reform_beneficiary" required spellcheck="false" class="black-select" >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label>Agrarian Reform Beneficiary:</label>
              <span class="arrow-down"></span>
            </div>
            <div class="input-field">
              <select v-model="parcel.ownership_type" required spellcheck="false" class="black-select" >
                <option value="registered owner">registered owner</option>
                <option value="other">other</option>
              </select>
              <label>Ownership Type:</label>
              <span class="arrow-down"></span>
            </div>
            <div class="input-field">
              <input
                type="text"
                v-model="parcel.tenant"
                required
                spellcheck="false"
              />
              <label>Tenant:</label>
            </div>
            <div class="input-field">
              <input
                type="text"
                v-model="parcel.lessee"
                required
                spellcheck="false"
              />
              <label>Lessee:</label>
            </div>
          </div>

          <div v-if="!parcel.isPreview" class="row">
            <!-- Loop through each table for "Crop/Livestock" and "Area Size" -->
            <div v-for="(table, tableIndex) in parcel.tables" :key="tableIndex" class="row">

            <div class="input-field">
              <select v-model="table.category" required spellcheck="false" class="black-select" >
                <option value="Crop Commodity">Crop Commodity</option>
                <option value="Livestock">Livestock</option>
              </select>
              <label>Category ({{ tableIndex + 1 }}):</label>
              <span class="arrow-down"></span>
            </div>

              <div v-if="table.category === 'Crop Commodity' || table.category === 'Livestock'" class="input-field">
                <input
                  type="text"
                  v-model="table.crop_livestock"
                  required
                  spellcheck="false"
                />
                <label>Crop/Livestock ({{ tableIndex + 1 }}):</label>
              </div>

              <div class="input-field" v-if="table.category === 'Crop Commodity'" >
                <input
                  type="text"
                  v-model="table.size"
                  required
                  spellcheck="false"
                />
                <label>Size ({{ tableIndex + 1 }}):</label>
              </div> 
              <div class="input-field" v-if="table.category === 'Livestock'" >
                <input
                  type="text"
                  v-model="table.no_of_heads"
                  required
                  spellcheck="false"
                />
                <label>No of Heads ({{ tableIndex + 1 }}):</label>
              </div>
              <div class="input-field">
              <select v-model="table.farm_type" required spellcheck="false" class="black-select" >
                <option value="(1)Irrigated">(1)Irrigated</option>
                <option value="(2)Rainfed Upland">(2)Rainfed Upland</option>
                <option value="(3)Rainfed Lowland">(3)Rainfed Lowland</option>
              </select>
              <label>Farm Type ({{ tableIndex + 1 }}):</label>
              <span class="arrow-down"></span>
            </div>
            <div class="input-field">
              <select v-model="table.organic_practitioner" required spellcheck="false" class="black-select" >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
              <label>Organic Practitioner ({{ tableIndex + 1 }}):</label>
              <span class="arrow-down"></span>
            </div>
            <div class="input-field" >
                <input
                  type="text"
                  v-model="table.remarks"
                  required
                  spellcheck="false"
                />
                <label>Remarks ({{ tableIndex + 1 }}):</label>
              </div>
            </div>
          </div>
          <div v-if="!parcel.isPreview" class="actions right-align">
              <button type="button" @click="previewParcel(index)">Preview</button>
              <button type="button" @click="addInputBox(index)">Add Parcel Table</button>
          </div>
          <div v-if="parcel.isPreview" class="actions right-align">
              <button type="button" @click="nextParcel(index)">Next</button>
          </div>

        </div>
          <div class="button-container">
          <button class="preview1-button" @click="changeHover(2)">Preview</button>
            <button type="submit" class="submit-button" >Submit</button> 
          </div>
        </div>
        

        <div v-if="alertMessage" class="alert-box">
          <i class="fa-regular fa-circle-check fa-5x" style="color: #63E6BE;"></i>
          <h1>Success</h1>
          <p>{{ alertMessage }}</p>
          <button @click="closeAlert">Ok</button>
        </div>
        
      </form>
      </div>
    
    </div>
  </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

const router = useRouter();
const isHovered = ref(1); 
const alertMessage = ref(''); 
const farmParcels = ref([]);
const clickCount = ref(0);

const addFarmTable = () => {
  farmParcels.value.push({
    farmer_id: null, // This will be assigned upon submit
    barangay: '',
    city_municipality: '',
    total_farm_area_ha: '',
    ownership_document_no: '',
    with_ancestral_domain: '',
    agrarian_reform_beneficiary: '',
    ownership_type: '',
    tenant: '',
    lessee: '',
    isPreview: true,
    tables: [], // To store additional related data
  });
  clickCount.value++;
};

const removeFarmTable = (index) => {
  farmParcels.value.splice(index, 1);
  if (clickCount.value > 0) {
    clickCount.value--;
  }
};

const nextParcel = (index) => {
  const parcel = farmParcels.value[index];
  parcel.isPreview = false;
};

const previewParcel = (index) => {
  const parcel = farmParcels.value[index];
  parcel.isPreview = true;
};

const addInputBox = (parcelIndex) => {
  farmParcels.value[parcelIndex].tables.push({
    crop_livestock: '', // Example field for the input box
  });
};

const farmer = ref({
  enrollment_type: 'New',
  reference_number: '',
  surname: '',
  first_name: '',
  middle_name: '',
  extension_name: '',
  sex: '',
  house_lot_bldg_no_purok: '',
  street_sitio_subdv: '',
  barangay: '',
  municipality_city: 'Tayabas City',
  province: 'Quezon Province',
  region: 'IV-A',
  mobile_number: '',
  landline_number: '',
  date_of_birth: '',
  place_of_birth: '',
  place_of_birth_province_state: '',
  place_of_birth_country: '',
  religion: '',
  civil_status: '',
  name_of_spouse_if_married: '',
  mothers_maiden_name: '',
  household_heads: '',
  if_no_name_of_household_heads: '',
  relationship: '',
  no_of_living_household_members: '',
  no_of_male: '',
  no_of_female: '',
  highest_formal_education: '',
  person_with_disability: '',
  IVps_beneficiary: '',
  member_of_an_indiginous_group: '',
  with_government_id: '',
  if_yes_specify_id_type: '',
  id_number: '',
  member_of_any_farmers_association_cooperative: '',
  if_yes_spefify_farmers_association: '',
  person_to_notify_in_case_of_emergency: '',
  contact_number: '',
  main_livelihood: '',
  type_of_farming_activity: '',
  farmworkers_kind_of_work: '',
  for_fisherfolk: '',
  for_agri_youth: '',
  type_of_farming_activities_other:'',
  other_crop_specify: '',
  livestock_specify: '',
  poultry_specify: '',
  for_farmworkers_other: '',
  for_fishfolk_other: '',
  for_agri_youth_other: '',

});
const showAdditionalInput = ref(false); 

const selectedSex = ref('');
const selectedReligion = ref('');
const selectedCivilStatus = ref('');
const selectedHouseholdHeads = ref('');
const selectedHighestFormalEduc = ref('');
const selectedPersonWithDisability = ref('');
const selectedIVpsBeneficiary = ref('');
const selectedMemberOfIndiginousGroup = ref('');
const selectedWithGovId = ref('');
const selectedMemberOfFarmersAssociation = ref('');
const selectedMainLivelihood = ref([]);
const selectedFarmingActivity = ref([]); 
const selectedFarmorker = ref([]); 
const selectedFishfolk = ref([]);
const selectedForAgriYouth = ref([]);

const isOtherSexSelected = computed(() => selectedSex.value === 'Other');
const isOtherSelected = computed(() => selectedReligion.value === 'Other');
const isOtherCivilStatusSelected = computed(() => selectedCivilStatus.value === 'Other');
const isOtherHighestFormalEduc = computed(() => selectedHighestFormalEduc.value === 'Other');

watch(selectedMainLivelihood, (newVal) => {
  farmer.value.main_livelihood = newVal; 
});
watch(selectedFarmingActivity, (newVal) => {
  farmer.value.type_of_farming_activity = newVal; 
});

watch(selectedFarmorker, (newVal) => {
  farmer.value.farmworkers_kind_of_work = newVal; 
});
watch(selectedFishfolk, (newVal) => {
  farmer.value.for_fisherfolk = newVal; 
});
watch(selectedForAgriYouth, (newVal) => {
  farmer.value.for_agri_youth = newVal; 
});

const changeHover = (index) => {
  isHovered.value = index; 
};
// const validateInputs = () => {
//       if (!farmer.value.enrollment_type || !farmer.value.reference_number || !farmer.value.surname || !farmer.value.first_name || !farmer.value.middle_name || !farmer.value.house_lot_bldg_no_purok
//       || !farmer.value.street_sitio_subdv || !farmer.value.mobile_number || !farmer.value.date_of_birth || !farmer.value.place_of_birth || !farmer.value.place_of_birth_province_state || !farmer.value.place_of_birth_country || !farmer.value.mothers_maiden_name
//       || !farmer.value.person_to_notify_in_case_of_emergency || !farmer.value.contact_number ) {
//         return;
//       }
//       changeHover(2); 
//     };


const logActivity = async (email, action) => {
  const token = localStorage.getItem('auth_token'); 
  try {
    await axios.post('http://localhost:8055/items/activity_logs', {
      admin_email: email,
      action: action,
      time: new Date().toISOString(),
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const unreadCount = parseInt(localStorage.getItem('unread_notifications')) || 0;
    localStorage.setItem('unread_notifications', unreadCount + 1);
    
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
const submitForm = async () => {
  try {
    farmer.value.sex = selectedSex.value === 'Other' ? farmer.value.sex : selectedSex.value;
    farmer.value.religion = selectedReligion.value === 'Other' ? farmer.value.religion : selectedReligion.value;
    farmer.value.civil_status = selectedCivilStatus.value === 'Other' ? farmer.value.civil_status : selectedCivilStatus.value;
    farmer.value.household_heads = selectedHouseholdHeads.value;
    farmer.value.highest_formal_education = selectedHighestFormalEduc.value === 'Other' ? farmer.value.highest_formal_education : selectedHighestFormalEduc.value;
    farmer.value.person_with_disability = selectedPersonWithDisability.value;
    farmer.value.IVps_beneficiary = selectedIVpsBeneficiary.value;
    farmer.value.member_of_an_indiginous_group = selectedMemberOfIndiginousGroup.value;
    farmer.value.with_government_id = selectedWithGovId.value;
    farmer.value.member_of_any_farmers_association_cooperative = selectedMemberOfFarmersAssociation.value;
    farmer.value.main_livelihood = selectedMainLivelihood.value;
    farmer.value.type_of_farming_activity = selectedFarmingActivity.value;
    farmer.value.farmworkers_kind_of_work = selectedFarmorker.value;
    farmer.value.for_fisherfolk = selectedFishfolk.value;
    farmer.value.for_agri_youth = selectedForAgriYouth.value;

    const token = localStorage.getItem('auth_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const email = localStorage.getItem('email');
    
    if (!token || !email) {
      alert('No authentication token or email found. Please log in again.');
      return;
    }

    try {
    // Create the farmer record
    const farmerResponse = await axios.post('http://localhost:8055/items/farmers', farmer.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const farmerId = farmerResponse.data.data.id;

    // Assign farmer_id to farmParcels and tables
    farmParcels.value = farmParcels.value.map(parcel => ({
      ...parcel,
      farmer_id: farmerId,
      tables: parcel.tables.map(table => ({
        ...table,
        farmer_table_id: farmerId,
      })),
    }));

    // Submit `farmParcels` data to Directus
    const parcelPromises = farmParcels.value.map(parcel => {
      const { tables, ...parcelData } = parcel; // Exclude 'tables' from main parcel submission
      return axios.post('http://localhost:8055/items/parcel', parcelData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    });

    // Submit `parcelTable` data to Directus
    const parcelTablePromises = farmParcels.value.flatMap(parcel =>
      parcel.tables.map(table =>
        axios.post('http://localhost:8055/items/parcel_table', table, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      )
    );

    // Wait for all the requests to complete
    await Promise.all([...parcelPromises, ...parcelTablePromises]);


    } catch (error) {
      if (error.response && error.response.status === 401) {
        const refreshResponse = await axios.post('http://localhost:8055/auth/refresh', {
          refresh_token: refreshToken,
        });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.data.access_token;
          const newRefreshToken = refreshResponse.data.data.refresh_token;

          localStorage.setItem('auth_token', newAccessToken);
          localStorage.setItem('refresh_token', newRefreshToken);

          response = await axios.post('http://localhost:8055/items/farmers', farmer.value, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              'Content-Type': 'application/json',
            },
          });
        } else {
          alert('Session expired. Please log in again or Refresh to Restore the Token.');
          return;
        }
      } else {
        console.error('Error creating farmer:', error.response ? error.response.data : error.message);
        alertMessage.value = 'An error occurred while creating the farmer.';
        return;
      }
    }

    logActivity(email, `Added farmer with reference number: ${farmer.value.reference_number}`);

    alertMessage.value = 'Farmer Created Successfully!';

    setTimeout(() => {
      router.push('/farmers/index');
    }, 2000); 
  } catch (error) {
    console.error('Error submitting form:', error.response ? error.response.data : error.message);
    alertMessage.value = 'An error occurred while creating the farmer.';
  }
};

const closeAlert = () => {
  alertMessage.value = ''; 
  router.push('/farmers/index');
};
</script>



<style scoped>
.create-container {
  display: flex;
  flex-direction: column;
  height: 100vh; 
  width: 100vw; 
  background-color: #f2f4f7;
  overflow: hidden; 
}

.content-box {
  position: relative;
  padding: 2rem;
  background-color: #f2f4f7;
  margin-top: 2rem;
  border-radius: 8px;
  height: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto; 
}

.nav-buttons {
  display: flex;
  gap: 20px; 
  flex-wrap: wrap; 
  margin-left: 60px;
}

.nav-button {
  background-color: #387e90;
  color: white; 
  border: none;
  padding: 10px 20px; 
  border-radius: 5px; 
  cursor: pointer;
  font-weight: bold; 
  transition: background-color 0.3s; 
}

.hover-green {
  background-color: #46cab6;
  color: white; 
}

.submit-button {
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer; 
  transition: background-color 0.3s ease; 
}

.button-container {
  display: flex;
  justify-content: center; 
  gap: 10px; 
  margin-top: 20px;
}

.next-button {
  background-color: #387e90;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.preview-button {
  background-color: #888888;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.preview1-button {
  background-color: #888888;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 30%;
}


.submit-button:hover {
  background-color: darkgreen; 
}
.farm-location-input {
    width: 450px;
    display: block;
    margin: 5px auto 5px auto;
    height: 35px;
}

.farm-location-input2 {
    width: 245px;
    height: 35px;
}
.ha {
    width: 70px;
}
.input-field1 {
    position: relative;
    height: 70px;
}

.input-field2 input {
    width: 210px;
    height: auto;
    font-size: 15px;
    padding: 5px 0;
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
    color: black;
    outline: none; 
    appearance: none;
    -webkit-appearance: none;
    transition: border-color 0.3s ease; 
}

select:focus ~ label,
select:valid ~ label {
    top: 0;
    left: 15px;
    font-size: 14px;
    padding: 0 2px;
    background: #f2f4f7;
    }

  input:focus {
    outline: none;
    box-shadow: 0 0 5px #f8f9fa; 
}

input:focus ~ label,
input:valid ~ label {
  top: 0;
  left: 15px;
  font-size: 14px;
  padding: 0 2px;
  background: #f2f4f7;
}

.add-farm-table-button {
  width: 40px;
  height: 40px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
  position: absolute;
  right: 40px;
  top: 32px;
}

.add-farm-table-button:hover {
  background-color: #0056b3;
  transform: scale(1.1);
}

.container {
  position: relative;
}

.table-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px dashed #aaa;
  background-color: #f9f9f9;
}

.parcel-info {
  margin-top: 5px;
}
.remove-parcel-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  width: 20px; /* Set width for the circle */
  height: 20px; /* Set height for the circle */
  display: inline-flex; /* Center content */
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
  cursor: pointer;
  border-radius: 50%; /* Make it circular */
}

.remove-parcel-button:hover {
  background-color: #d93636;
}
.right-align {
    display: flex;
    justify-content: flex-end;
    padding-right: 15px; /* Adjust this value as needed */
}

.actions button {
    padding: 10px 20px;  /* You can adjust this padding */
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 5px;
}

.actions button:hover {
    background-color: #0056b3;
}

.top-section {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.info-box h1 {
  margin: 0 0 10px;
  font-size: 28px;
  font-weight: bold;
  color: black;
  text-transform: capitalize;
}
.info-box h2 {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-transform: capitalize;
}


</style>
