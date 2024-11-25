<template>
  <div class="create-container">
    <Navbar />
    <div class="content-box">
      <div class="nav-buttons">
        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 1 }"
            @mouseover="setHover(1)"
            @mouseleave="resetHover"
            @click="changeHover(1)"
          >
            Personal Info [1]
          </button>
        </router-link>
        
        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 2 }"
            @mouseover="setHover(2)"
            @click="changeHover(2)"
          >
            Personal Info [2]
          </button>
        </router-link>

        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 3 }"
            @mouseover="setHover(3)"
            @click="changeHover(3)"
          >
            Personal Info [3]
          </button>
        </router-link>

        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 4 }"
            @mouseover="setHover(4)"
            @click="changeHover(4)"
          >
            Farm Profile
          </button>
        </router-link>
        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 5 }"
            @mouseover="setHover(5)"
            @click="changeHover(5)"
          >
            Farm Profile II
          </button>
        </router-link>
        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 6 }"
            @mouseover="setHover(6)"
            @click="changeHover(6)"
          >
            Uploads (id,image)
          </button>
        </router-link>
      </div>
      <br>
      <br>
      <div class="personal-info-sections">
        <form @submit.prevent="submitForm">
        <!-- Personal Information I -->
        <div v-if="isHovered === 1" id="personalInfoI" class="personal-info-section">
            <div class="row mb-3">
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
                  spellcheck="false"
                />
                <label>Reference Number:</label>
              </div>
              <!-- <div v-if="farmer.image" class="image-preview" style="margin-top: -60px; margin-left: 10px">
                <img :src="farmer.image" alt="Selected Image" width="220" height="150" />
              </div> -->
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
                <input
                  type="text"
                  v-model="farmer.barangay"
                  required
                  spellcheck="false"
                />
                <label>BARANGAY:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.municipality_city"
                  required
                  spellcheck="false"
                />
                <label>MUNICIPALITY/CITY:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.province"
                  required
                  spellcheck="false"
                />
                <label>PROVINCE:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.region"
                  required
                  spellcheck="false"
                />
                <label>Region:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.mobile_number"
                  required
                  spellcheck="false"
                />
                <label>MOBILE NUMBER:</label>
              </div>
            </div>
        </div>

        
        <div v-if="isHovered === 2" id="personalInfoII" class="personal-info-section">
            <div class="row mb-3">
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.landline_number"
                  required
                  spellcheck="false"
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
              <div class="input-field-container">
              <div class="input-field">
                <input
                  type="number"
                  v-model="farmer.if_no_name_of_household_heads" 
                  spellcheck="false"
                />
                <label>IF NO. OF HOUSEHOLD HEADS:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.relationship" 
                  spellcheck="false"
                />
                <label>RELATIONSHIP:</label>
              </div>
              <div class="input-field">
                <input
                  type="number"
                  v-model="farmer.no_of_living_household_members" 
                  spellcheck="false"
                />
                <label>NO. OF LIVING HOUSEHOLD MEMBERS:</label>
              </div>
              <div class="input-field">
                <input
                  type="number"
                  v-model="farmer.no_of_male" 
                  spellcheck="false"
                />
                <label>NO. OF MALE:</label>
              </div>
              <div class="input-field">
                <input
                  type="number"
                  v-model="farmer.no_of_female" 
                  spellcheck="false"
                />
                <label>NO. OF FEMALE:</label>
              </div>
            </div>

            </div>
            </div>
        </div>
        
        <div v-if="isHovered === 3" id="personalInfoIII" class="personal-info-section">
          <div class="row mb-3">
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
              <label>MEMBER OF ANY FARMERS ASSOCIATION:</label>
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
                <label>PERSON TO NOTIFY INCASE OF IMERGENCY:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.contact_number" 
                  required
                  spellcheck="false"
                />
                <label>CONTACT NUMBER:</label>
              </div>
          </div>
        </div>

        
        <div v-if="isHovered === 4" id="personalInfoIV" class="personal-info-section">
          <div class="row mb-3">
            <nav class="navbar">
            <div class="navbar-content">
              <div class="checkbox-group">
                <div class="checkbox-list">
                  <label>Main Livelihood:</label>
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
          
          <div class="checkbox-group" v-if="selectedMainLivelihood.includes('farmer')">
            <label class="farming-activity-label">TYPE OF FARMING ACTIVITY:</label>
            <div class="check-box">
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
                Other crops / specify
              </label>
              <label>
                <input type="checkbox" value="livestock" v-model="selectedFarmingActivity" />
                Livestock / specify
              </label>
              <label>
                <input type="checkbox" value="poultry" v-model="selectedFarmingActivity" />
                Poultry / specify
              </label>
              <label>
                <input type="checkbox" value="type_of_farming_activities_other" v-model="selectedFarmingActivity" />
                Other, please specify
              </label>
            </div>
          </div>
          <div class="checkbox-group" v-if="selectedMainLivelihood.includes('farmworker/laborer')">
            <label class="farming-activity-label">FOR FARMWORKERS:</label>
            <div class="check-box">
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
            </div>
          </div>
          <div class="checkbox-group" v-if="selectedMainLivelihood.includes('fisherfolk')">
            <label class="farming-activity-label">FOR FISHERFOLK:</label>
            <div class="check-box">
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
            </div>
          </div>
          <div class="checkbox-group" v-if="selectedMainLivelihood.includes('agri youth')">
            <label class="farming-activity-label">FOR AGRI YOUTH:</label>
            <div class="check-box">
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
            </div>
          </div>
        </div>
              <div class="row mb-3">
                <div class="input-field" v-if="selectedFarmingActivity.includes('type_of_farming_activities_other')">
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.type_of_farming_activities_other" 
                  spellcheck="false"
                />
                <label>Other, For Type of Activity:</label>
              </div>
            </div>
              <div class="input-field" v-if="selectedFarmingActivity.includes('other_crop')">
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.other_crop_specify" 
                  spellcheck="false"
                />
                <label>Other, Crops Specify:</label>
              </div>
            </div>
            <div class="input-field" v-if="selectedFarmingActivity.includes('livestock')">
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.livestock_specify" 
                  spellcheck="false"
                />
                <label>Other, Livestocks Specify:</label>
              </div>
            </div>
            <div class="input-field" v-if="selectedFarmingActivity.includes('poultry')">
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.poultry_specify" 
                  spellcheck="false"
                />
                <label>Other, Poultry Specify:</label>
              </div>
            </div>
            <div class="input-field" v-if="selectedFarmorker.includes('for_farmworkers_other')">
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.for_farmworkers_other" 
                  spellcheck="false"
                />
                <label>Other, For Farmworker:</label>
              </div>
            </div>
            <div class="input-field" v-if="selectedFishfolk.includes('for_fishfolk_other')">
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.for_fishfolk_other" 
                  spellcheck="false"
                />
                <label>Other, For Fishfolk:</label>
              </div>
            </div>
            <div class="input-field" v-if="selectedForAgriYouth.includes('for_agri_youth_other')">
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.for_agri_youth_other" 
                  spellcheck="false"
                />
                <label>Other, For Agri Youth:</label>
              </div>
            </div>


          </div>
        </div>

        <div v-if="isHovered === 5" id="personalInfoIV" class="personal-info-section">
          <button type="button" @click="addFarmTable" class="add-farm-table-button">Add Farm Parcel No.</button>
            <div class="table-container">
                <!-- Table 1 -->
                <table id="farmTable1">
                    <thead>
                        <tr>
                            <th>Farm Parcel No.</th>
                            <th>Farm Land Description</th>
                            <th>CROP/COMMODITY <br>(Rice/Corn/HVC/Livestock/Poultry/Agri-fishery) <br> For Livestock & Poultry <br>(specify type of animal)</th>
                            <th>SIZE (ha)</th>
                            <th>No. of Head <br>(For Livestock and Poultry)</th>
                            <th>Farm Type</th>
                            <th>Organic Practitioner <br>(Y/N)</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody id="farmRows1">
                        <tr class="farmRow">
                            <td class="parcelNo">1</td>
                            <td>
                                <div>
                                    <b>Farm Location:</b>
                                    <input type="text" v-model="farmer.farm_location_brgy1" class="farm-location-input" required>
                                    <div style="text-align: center;">Barangay</div>
                                    <input type="text" v-model="farmer.farm_location_city_muni1" class="farm-location-input" required>
                                    <div style="text-align: center;">City/Municipality</div>
                                    <br>
                                    <b>Total Farm Area (in hectares):</b> <input type="number" v-model="totalSizeHa" class="ha" required readonly> ha <br>
                                    <b>Within Ancestral Domain:</b>
                                    <input type="radio" v-model="selectedAncentralDomain" value="yes" id="yes" required>
                                    <label for="yes">Yes</label>
                                    <input type="radio" v-model="selectedAncentralDomain" value="no" id="no" required>
                                    <label for="no">No</label><br>
                                    <b>Ownership Document No.:</b> <input type="text" v-model="farmer.ownership_document_no_1" class="farm-location-input2" required> <br>
                                    <b>Agrarian Reform Beneficiary:</b>
                                    <input type="radio" v-model="selectedAgrarianReform" value="yes" id="yes" required>
                                    <label for="yes">Yes</label>
                                    <input type="radio" v-model="selectedAgrarianReform" value="no" id="no" required>
                                    <label for="no">No</label><br>
                                    <b>Ownership Type:</b>
                                    <input type="radio" v-model="selectedRegisterOwner" value="Register Owner" id="Register Owner" required>
                                    <label for="Register Owner">Register Owner</label>
                                    <input type="radio" v-model="selectedRegisterOwner" value="Others" id="Others" required>
                                    <label for="Others">Others</label><br>
                                    Tenant(Name of Land Owner: <input type="text" v-model="farmer.tenant_1" class="farm-location-input2" required>)<br>
                                    Lessee(Name of Land Owner: <input type="text" v-model="farmer.lessee_1" class="farm-location-input2" required>)
                                </div>
                            </td>
                            <td>
                              <button class="add-crops" type="button" @click="toggleCropInput">Add Crops</button>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_1" required spellcheck="false"/>
                                <label>Crops / Commodity (1):</label>
                              </div>
                              <div v-if="showCropInput2" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_2" required spellcheck="false"/>
                                <label>Crops / Commodity (2):</label>
                              </div>
                              <div v-if="showCropInput3" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_3" required spellcheck="false" />
                                <label>Crops / Commodity (3):</label>
                              </div>
                              <div v-if="showCropInput4" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_4" required spellcheck="false" />
                                <label>Crops / Commodity (4):</label>
                              </div>
                              <div v-if="showCropInput5" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_5" required spellcheck="false" />
                                <label>Crops / Commodity (5):</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_1" required spellcheck="false" step="any" />
                                <label>Size (ha) (1):</label>
                              </div>
                              <div v-if="showSizeHa2" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_2" required spellcheck="false" step="any" />
                                <label>Size (ha) (2):</label>
                              </div>
                              <div v-if="showSizeHa3" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_3" required spellcheck="false" step="any" />
                                <label>Size (ha) (3):</label>
                              </div>
                              <div v-if="showSizeHa4" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_4" required spellcheck="false" step="any" />
                                <label>Size (ha) (4):</label>
                              </div>
                              <div v-if="showSizeHa5" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_5" required spellcheck="false" step="any" />
                                <label>Size (ha) (5):</label>
                              </div>
                              <!-- <div class="total-size">
                                <p>Total Size (ha): {{ totalSizeHa }}</p>
                              </div> -->
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_1" required spellcheck="false" step="any" />
                                <label>No. of Heads (1):</label>
                              </div>
                              <div v-if="showNoOfHeads2" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_2" required spellcheck="false" step="any" />
                                <label>No. of Heads (2):</label>
                              </div>
                              <div v-if="showNoOfHeads3" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_3" required spellcheck="false" step="any" />
                                <label>No. of Heads (3):</label>
                              </div>
                              <div v-if="showNoOfHeads4" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_4" required spellcheck="false" step="any" />
                                <label>No. of Heads (4):</label>
                              </div>
                              <div v-if="showNoOfHeads5" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_5" required spellcheck="false" step="any" />
                                <label>No. of Heads (5):</label>
                              </div>
                              
                            </td>
                            <td>
                              <div class="input-field1">
                                <select v-model="selectedFarmType" required spellcheck="false" class="black-select">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                </select>
                                <label>Farm Type:</label>
                                <span class="arrow-down1"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <select v-model="selectedOrganicPractitioner" required spellcheck="false" class="black-select">
                                  <option value="yes">Yes</option>
                                  <option value="no">No</option>
                                </select>
                                <label>Practitioner:</label>
                                <span class="arrow-down1"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field2">
                                <textarea type="text" v-model="farmer.remarks1" required spellcheck="false"/>
                              </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- Table 2 -->
                <table v-if="showFarmTable2" id="farmTable2">
                    <thead>
                        <tr>
                          <th>Farm Parcel No.</th>
                            <th>Farm Land Description</th>
                            <th>CROP/COMMODITY <br>(Rice/Corn/HVC/Livestock/Poultry/Agri-fishery) <br> For Livestock & Poultry <br>(specify type of animal)</th>
                            <th>SIZE (ha)</th>
                            <th>No. of Head <br>(For Livestock and Poultry)</th>
                            <th>Farm Type</th>
                            <th>Organic Practitioner <br>(Y/N)</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody id="farmRows2">
                        <tr class="farmRow">
                            <td class="parcelNo">2</td>
                            <td>
                              <div>
                                    <b>Farm Location:</b>
                                    <input type="text" v-model="farmer.farm_location_brgy2" class="farm-location-input">
                                    <div style="text-align: center;">Barangay</div>
                                    <input type="text" v-model="farmer.farm_location_city_muni2" class="farm-location-input">
                                    <div style="text-align: center;">City/Municipality</div>
                                    <br>
                                    <b>Total Farm Area (in hectares):</b> <input type="number" v-model="totalSizeHa2" class="ha" required readonly> ha <br>
                                    <b>Within Ancestral Domain:</b>
                                    <input type="radio" v-model="selectedAncentralDomain2" value="yes" id="yes">
                                    <label for="yes">Yes</label>
                                    <input type="radio" v-model="selectedAncentralDomain2" value="no" id="no">
                                    <label for="no">No</label><br>
                                    <b>Ownership Document No.:</b> <input type="text" v-model="farmer.ownership_document_no_2" class="farm-location-input2"> <br>
                                    <b>Agrarian Reform Beneficiary:</b>
                                    <input type="radio" v-model="selectedAgrarianReform2" value="yes" id="yes">
                                    <label for="yes">Yes</label>
                                    <input type="radio" v-model="selectedAgrarianReform2" value="no" id="no">
                                    <label for="no">No</label><br>
                                    <b>Ownership Type:</b>
                                    <input type="radio" v-model="selectedRegisterOwner2" value="Register Owner" id="Register Owner">
                                    <label for="Register Owner">Register Owner</label>
                                    <input type="radio" v-model="selectedRegisterOwner2" value="Others" id="Others">
                                    <label for="Others">Others</label><br>
                                    Tenant(Name of Land Owner: <input type="text" v-model="farmer.tenant_2" class="farm-location-input2">)<br>
                                    Lessee(Name of Land Owner: <input type="text" v-model="farmer.lessee_2" class="farm-location-input2">)
                                </div>
                            </td>
                            <td>
                              <button class="add-crops" type="button" @click="toggleCropInput2">Add Crops</button>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity2_1" required spellcheck="false"/>
                                <label>Crops / Commodity (1):</label>
                              </div>
                              <div v-if="showCropInput2_2" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity2_2" required spellcheck="false"/>
                                <label>Crops / Commodity (2):</label>
                              </div>
                              <div v-if="showCropInput3_2" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity2_3" required spellcheck="false" />
                                <label>Crops / Commodity (3):</label>
                              </div>
                              <div v-if="showCropInput4_2" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity2_4" required spellcheck="false" />
                                <label>Crops / Commodity (4):</label>
                              </div>
                              <div v-if="showCropInput5_2" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity2_5" required spellcheck="false" />
                                <label>Crops / Commodity (5):</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa2_1" required spellcheck="false" step="any" />
                                <label>Size (ha) (1):</label>
                              </div>
                              <div v-if="showSizeHa2_2" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa2_2" required spellcheck="false" step="any" />
                                <label>Size (ha) (2):</label>
                              </div>
                              <div v-if="showSizeHa3_2" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa2_3" required spellcheck="false" step="any" />
                                <label>Size (ha) (3):</label>
                              </div>
                              <div v-if="showSizeHa4_2" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa2_4" required spellcheck="false" step="any" />
                                <label>Size (ha) (4):</label>
                              </div>
                              <div v-if="showSizeHa5_2" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa2_5" required spellcheck="false" step="any" />
                                <label>Size (ha) (5):</label>
                              </div>
                              <!-- <div class="total-size">
                                <p>Total Size (ha): {{ totalSizeHa }}</p>
                              </div> -->
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head2_1" required spellcheck="false" step="any" />
                                <label>No. of Heads (1):</label>
                              </div>
                              <div v-if="showNoOfHeads2_2" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head2_2" required spellcheck="false" step="any" />
                                <label>No. of Heads (2):</label>
                              </div>
                              <div v-if="showNoOfHeads3_2" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head2_3" required spellcheck="false" step="any" />
                                <label>No. of Heads (3):</label>
                              </div>
                              <div v-if="showNoOfHeads4_2" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head2_4" required spellcheck="false" step="any" />
                                <label>No. of Heads (4):</label>
                              </div>
                              <div v-if="showNoOfHeads5_2" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head2_5" required spellcheck="false" step="any" />
                                <label>No. of Heads (5):</label>
                              </div>
                              
                            </td>
                            <td>
                              <div class="input-field1">
                                <select v-model="selectedFarmType2" required spellcheck="false" class="black-select">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                </select>
                                <label>Farm Type:</label>
                                <span class="arrow-down1"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <select v-model="selectedOrganicPractitioner2" required spellcheck="false" class="black-select">
                                  <option value="yes">Yes</option>
                                  <option value="no">No</option>
                                </select>
                                <label>Practitioner:</label>
                                <span class="arrow-down1"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field2">
                                <textarea type="text" v-model="farmer.remarks2" required spellcheck="false"/>
                              </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- Table 3 -->
                <table v-if="showFarmTable3" id="farmTable3">
                    <thead>
                        <tr>
                            <th>Farm Parcel No.</th>
                            <th>Farm Land Description</th>
                            <th>CROP/COMMODITY</th>
                            <th>SIZE (ha)</th>
                            <th>No. of Head</th>
                            <th>Farm Type</th>
                            <th>Organic Practitioner</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody id="farmRows3">
                        <tr class="farmRow">
                            <td class="parcelNo">3</td>
                            <td>
                              <div>
                                    <b>Farm Location:</b>
                                    <input type="text" v-model="farmer.farm_location_brgy3" class="farm-location-input">
                                    <div style="text-align: center;">Barangay</div>
                                    <input type="text" v-model="farmer.farm_location_city_muni3" class="farm-location-input">
                                    <div style="text-align: center;">City/Municipality</div>
                                    <br>
                                    <b>Total Farm Area (in hectares):</b> <input type="number" v-model="totalSizeHa3" class="ha" required readonly> ha <br>
                                    <b>Within Ancestral Domain:</b>
                                    <input type="radio" v-model="selectedAncentralDomain3" value="yes" id="yes">
                                    <label for="yes">Yes</label>
                                    <input type="radio" v-model="selectedAncentralDomain3" value="no" id="no">
                                    <label for="no">No</label><br>
                                    <b>Ownership Document No.:</b> <input type="text" v-model="farmer.ownership_document_no_3" class="farm-location-input2"> <br>
                                    <b>Agrarian Reform Beneficiary:</b>
                                    <input type="radio" v-model="selectedAgrarianReform3" value="yes" id="yes">
                                    <label for="yes">Yes</label>
                                    <input type="radio" v-model="selectedAgrarianReform3" value="no" id="no">
                                    <label for="no">No</label><br>
                                    <b>Ownership Type:</b>
                                    <input type="radio" v-model="selectedRegisterOwner3" value="Register Owner" id="Register Owner">
                                    <label for="Register Owner">Register Owner</label>
                                    <input type="radio" v-model="selectedRegisterOwner3" value="Others" id="Others">
                                    <label for="Others">Others</label><br>
                                    Tenant(Name of Land Owner: <input type="text" v-model="farmer.tenant_3" class="farm-location-input2">)<br>
                                    Lessee(Name of Land Owner: <input type="text" v-model="farmer.lessee_3" class="farm-location-input2">)
                                </div>
                            </td>
                            <td>
                              <button class="add-crops" type="button" @click="toggleCropInput3">Add Crops</button>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity3_1" required spellcheck="false"/>
                                <label>Crops / Commodity (1):</label>
                              </div>
                              <div v-if="showCropInput2_3" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity3_2" required spellcheck="false"/>
                                <label>Crops / Commodity (2):</label>
                              </div>
                              <div v-if="showCropInput3_3" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity3_3" required spellcheck="false" />
                                <label>Crops / Commodity (3):</label>
                              </div>
                              <div v-if="showCropInput4_3" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity3_4" required spellcheck="false" />
                                <label>Crops / Commodity (4):</label>
                              </div>
                              <div v-if="showCropInput5_3" class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity3_5" required spellcheck="false" />
                                <label>Crops / Commodity (5):</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa3_1" required spellcheck="false" step="any" />
                                <label>Size (ha) (1):</label>
                              </div>
                              <div v-if="showSizeHa2_3" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa3_2" required spellcheck="false" step="any" />
                                <label>Size (ha) (2):</label>
                              </div>
                              <div v-if="showSizeHa3_3" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa3_3" required spellcheck="false" step="any" />
                                <label>Size (ha) (3):</label>
                              </div>
                              <div v-if="showSizeHa4_3" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa3_4" required spellcheck="false" step="any" />
                                <label>Size (ha) (4):</label>
                              </div>
                              <div v-if="showSizeHa5_3" class="input-field1">
                                <input type="number" v-model="farmer.sizeHa3_5" required spellcheck="false" step="any" />
                                <label>Size (ha) (5):</label>
                              </div>
                              <!-- <div class="total-size">
                                <p>Total Size (ha): {{ totalSizeHa }}</p>
                              </div> -->
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head3_1" required spellcheck="false" step="any" />
                                <label>No. of Heads (1):</label>
                              </div>
                              <div v-if="showNoOfHeads2_3" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head3_2" required spellcheck="false" step="any" />
                                <label>No. of Heads (2):</label>
                              </div>
                              <div v-if="showNoOfHeads3_3" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head3_3" required spellcheck="false" step="any" />
                                <label>No. of Heads (3):</label>
                              </div>
                              <div v-if="showNoOfHeads4_3" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head3_4" required spellcheck="false" step="any" />
                                <label>No. of Heads (4):</label>
                              </div>
                              <div v-if="showNoOfHeads5_3" class="input-field1">
                                <input type="number" v-model="farmer.no_of_head3_5" required spellcheck="false" step="any" />
                                <label>No. of Heads (5):</label>
                              </div>
                              
                            </td>
                            <td>
                              <div class="input-field1">
                                <select v-model="selectedFarmType3" required spellcheck="false" class="black-select">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                </select>
                                <label>Farm Type:</label>
                                <span class="arrow-down1"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <select v-model="selectedOrganicPractitioner3" required spellcheck="false" class="black-select">
                                  <option value="yes">Yes</option>
                                  <option value="no">No</option>
                                </select>
                                <label>Practitioner:</label>
                                <span class="arrow-down1"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field2">
                                <textarea type="text" v-model="farmer.remarks3" required spellcheck="false"/>
                              </div>
                            </td>
                        </tr>
                    </tbody>
                </table>         
            </div>
        </div>

        <div v-if="isHovered === 6" id="personalInfoI" class="personal-info-section">
            <div class="row mb-3">
              <!-- <input type="file" @change="onImageSelected" accept="image/*" />
              <div v-if="farmer.image" class="image-preview" style="margin-top: -60px; margin-left: 10px">
                <img :src="farmer.image" alt="Selected Image" width="220" height="150" />
              </div> -->
              </div>
        </div>

        <div v-if="alertMessage" class="alert-box">
          <i class="fa-regular fa-circle-check fa-5x" style="color: #63E6BE;"></i>
          <h1>Success</h1>
          <p>{{ alertMessage }}</p>
          <button @click="closeAlert">Ok</button>
        </div>
        <button type="submit" class="submit-button" style="display: block; margin: 0 auto;">Submit</button>
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
const showFarmTable2 = ref(false);
const showFarmTable3 = ref(false); 
const showCropInput2 = ref(false);
const showCropInput3 = ref(false);
const showCropInput4 = ref(false);
const showCropInput5 = ref(false);
const showSizeHa2 = ref(false);
const showSizeHa3 = ref(false);
const showSizeHa4 = ref(false);
const showSizeHa5 = ref(false);
const showNoOfHeads2 = ref(false);
const showNoOfHeads3 = ref(false);
const showNoOfHeads4 = ref(false);
const showNoOfHeads5 = ref(false);


const showCropInput2_2 = ref(false);
const showCropInput3_2 = ref(false);
const showCropInput4_2 = ref(false);
const showCropInput5_2 = ref(false);
const showSizeHa2_2 = ref(false);
const showSizeHa3_2 = ref(false);
const showSizeHa4_2 = ref(false);
const showSizeHa5_2 = ref(false);
const showNoOfHeads2_2 = ref(false);
const showNoOfHeads3_2 = ref(false);
const showNoOfHeads4_2 = ref(false);
const showNoOfHeads5_2 = ref(false);

const showCropInput2_3 = ref(false);
const showCropInput3_3 = ref(false);
const showCropInput4_3 = ref(false);
const showCropInput5_3 = ref(false);
const showSizeHa2_3 = ref(false);
const showSizeHa3_3 = ref(false);
const showSizeHa4_3 = ref(false);
const showSizeHa5_3 = ref(false);
const showNoOfHeads2_3 = ref(false);
const showNoOfHeads3_3 = ref(false);
const showNoOfHeads4_3 = ref(false);
const showNoOfHeads5_3 = ref(false);

let clickCount = 0; 

const addFarmTable = () => {
  clickCount++;
  
  if (clickCount === 1) {
    showFarmTable2.value = true; // First click
  } else if (clickCount === 2) {
    showFarmTable3.value = true; // Second click
    clickCount = 0; // Reset clickCount for future toggles
  }
};
const toggleCropInput = () => {
      // Show inputs sequentially based on button clicks
      if (!showCropInput2.value && !showNoOfHeads2.value && !showSizeHa2.value) {
        showCropInput2.value = true;
        showNoOfHeads2.value = true;
        showSizeHa2.value = true;
      }else if (!showCropInput3.value && !showNoOfHeads3.value && !showSizeHa3.value) {
        showCropInput3.value = true;
        showNoOfHeads3.value = true;
        showSizeHa3.value = true;
      } else if (!showCropInput4.value && !showNoOfHeads4.value && !showSizeHa4.value) {
        showCropInput4.value = true;
        showNoOfHeads4.value = true;
        showSizeHa4.value = true;
      }else if (!showCropInput5.value && !showNoOfHeads5.value && !showSizeHa5.value) {
        showCropInput5.value = true;
        showNoOfHeads5.value = true;
        showSizeHa5.value = true;
      } 
    };
    const toggleCropInput2 = () => {
      // Show inputs sequentially based on button clicks
      if (!showCropInput2_2.value && !showNoOfHeads2_2.value && !showSizeHa2_2.value) {
        showCropInput2_2.value = true;
        showNoOfHeads2_2.value = true;
        showSizeHa2_2.value = true;
      }else if (!showCropInput3_2.value && !showNoOfHeads3_2.value && !showSizeHa3_2.value) {
        showCropInput3_2.value = true;
        showNoOfHeads3_2.value = true;
        showSizeHa3_2.value = true;
      } else if (!showCropInput4_2.value && !showNoOfHeads4_2.value && !showSizeHa4_2.value) {
        showCropInput4_2.value = true;
        showNoOfHeads4_2.value = true;
        showSizeHa4_2.value = true;
      }else if (!showCropInput5_2.value && !showNoOfHeads5_2.value && !showSizeHa5_2.value) {
        showCropInput5_2.value = true;
        showNoOfHeads5_2.value = true;
        showSizeHa5_2.value = true;
      } 
    };
    const toggleCropInput3 = () => {
      // Show inputs sequentially based on button clicks
      if (!showCropInput2_3.value && !showNoOfHeads2_3.value && !showSizeHa2_3.value) {
        showCropInput2_3.value = true;
        showNoOfHeads2_3.value = true;
        showSizeHa2_3.value = true;
      }else if (!showCropInput3_3.value && !showNoOfHeads3_3.value && !showSizeHa3_3.value) {
        showCropInput3_3.value = true;
        showNoOfHeads3_3.value = true;
        showSizeHa3_3.value = true;
      } else if (!showCropInput4_3.value && !showNoOfHeads4_3.value && !showSizeHa4_3.value) {
        showCropInput4_3.value = true;
        showNoOfHeads4_3.value = true;
        showSizeHa4_3.value = true;
      }else if (!showCropInput5_3.value && !showNoOfHeads5_3.value && !showSizeHa5_3.value) {
        showCropInput5_3.value = true;
        showNoOfHeads5_3.value = true;
        showSizeHa5_3.value = true;
      } 
    };

    const totalSizeHa = computed(() => {
      return (
        (farmer.value.sizeHa1_1 || 0) +
        (farmer.value.sizeHa1_2 || 0) +
        (farmer.value.sizeHa1_3 || 0) +
        (farmer.value.sizeHa1_4 || 0) +
        (farmer.value.sizeHa1_5 || 0)
      );
    });
    const totalSizeHa2 = computed(() => {
      return (
        (farmer.value.sizeHa2_1 || 0) +
        (farmer.value.sizeHa2_2 || 0) +
        (farmer.value.sizeHa2_3 || 0) +
        (farmer.value.sizeHa2_4 || 0) +
        (farmer.value.sizeHa2_5 || 0)
      );
    });
    const totalSizeHa3 = computed(() => {
      return (
        (farmer.value.sizeHa3_1 || 0) +
        (farmer.value.sizeHa3_2 || 0) +
        (farmer.value.sizeHa3_3 || 0) +
        (farmer.value.sizeHa3_4 || 0) +
        (farmer.value.sizeHa3_5 || 0)
      );
    });

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
  municipality_city: '',
  province: '',
  region: '',
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
  no_of_head1_1:'0',
  no_of_head1_2:'0',
  no_of_head1_3:'0',
  no_of_head1_4:'0',
  no_of_head1_5:'0',
  no_of_head2_1:'0',
  no_of_head2_2:'0',
  no_of_head2_3:'0',
  no_of_head2_4:'0',
  no_of_head2_5:'0',
  no_of_head3_1:'0',
  no_of_head3_2:'0',
  no_of_head3_3:'0',
  no_of_head3_4:'0',
  no_of_head3_5:'0',
});
// Image upload handling
// const onImageSelected = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       farmer.value.image = e.target.result; // Set the base64 image to farmer
//     };
//     reader.readAsDataURL(file); // Convert image to base64 string
//   }
// };
// Add this reactive variable
const showAdditionalInput = ref(false); // Initialize to false

// New reactive variables to handle selections
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
const selectedAncentralDomain = ref('');
const selectedAgrarianReform = ref('');
const selectedRegisterOwner = ref('');
const selectedAncentralDomain2 = ref('');
const selectedAgrarianReform2 = ref('');
const selectedRegisterOwner2 = ref('');
const selectedAncentralDomain3 = ref('');
const selectedAgrarianReform3 = ref('');
const selectedRegisterOwner3 = ref('');
const selectedOrganicPractitioner = ref('');
const selectedFarmType = ref('');
const selectedOrganicPractitioner2 = ref('');
const selectedFarmType2 = ref('');
const selectedOrganicPractitioner3 = ref('');
const selectedFarmType3 = ref('');

// Computed properties to check if "Other" is selected
const isOtherSexSelected = computed(() => selectedSex.value === 'Other');
const isOtherSelected = computed(() => selectedReligion.value === 'Other');
const isOtherCivilStatusSelected = computed(() => selectedCivilStatus.value === 'Other');
const isOtherHighestFormalEduc = computed(() => selectedHighestFormalEduc.value === 'Other');


// Watch selectedMainLivelihood to update farmer's main livelihood
watch(selectedMainLivelihood, (newVal) => {
  farmer.value.main_livelihood = newVal; // Update based on selected checkboxes
});
// Watch selectedFarmingActivity to update farmer's type_of_farming_activity
watch(selectedFarmingActivity, (newVal) => {
  farmer.value.type_of_farming_activity = newVal; // Update based on selected checkboxes
});

watch(selectedFarmorker, (newVal) => {
  farmer.value.farmworkers_kind_of_work = newVal; // Update based on selected checkboxes
});
watch(selectedFishfolk, (newVal) => {
  farmer.value.for_fisherfolk = newVal; // Update based on selected checkboxes
});
watch(selectedForAgriYouth, (newVal) => {
  farmer.value.for_agri_youth = newVal; // Update based on selected checkboxes
});

// Function to set hover state
const setHover = (index) => {
  isHovered.value = index; // Set the hover state to the index of the button
};

const changeHover = (index) => {
  isHovered.value = index; // Change hover when button is clicked
};

const resetHover = () => {
  isHovered.value = 1; // Optional: Reset hover if needed
};
// Function to log activity (email, time, and action) to localStorage
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
    
    // Increment unread notifications
    const unreadCount = parseInt(localStorage.getItem('unread_notifications')) || 0;
    localStorage.setItem('unread_notifications', unreadCount + 1);
    
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
// Function to submit the form
const submitForm = async () => {
  try {
    // Set farmer information based on selected values
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
    farmer.value.ancestral_domain_1 = selectedAncentralDomain.value;
    farmer.value.agrarian_reform_1 = selectedAgrarianReform.value;
    farmer.value.registered_owner_1 = selectedRegisterOwner.value;
    farmer.value.ancestral_domain_2 = selectedAncentralDomain2.value;
    farmer.value.agrarian_reform_2 = selectedAgrarianReform2.value;
    farmer.value.registered_owner_2 = selectedRegisterOwner2.value;
    farmer.value.ancestral_domain_3 = selectedAncentralDomain3.value;
    farmer.value.agrarian_reform_3 = selectedAgrarianReform3.value;
    farmer.value.registered_owner_3 = selectedRegisterOwner3.value;
    farmer.value.organic_practitioner1 = selectedOrganicPractitioner.value;
    farmer.value.farm_type1 = selectedFarmType.value;
    farmer.value.organic_practitioner2 = selectedOrganicPractitioner2.value;
    farmer.value.farm_type2 = selectedFarmType2.value;
    farmer.value.organic_practitioner3 = selectedOrganicPractitioner3.value;
    farmer.value.farm_type3 = selectedFarmType3.value;

    // Retrieve token and email from localStorage
    const token = localStorage.getItem('auth_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const email = localStorage.getItem('email');

    if (!token || !email) {
      alert('No authentication token or email found. Please log in again.');
      return;
    }

    let response;
    try {
      // Attempt to make the POST request with the current access token
      response = await axios.post('http://localhost:8055/items/farmers', farmer.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      // If the request fails with a 401 Unauthorized error (expired token), attempt to refresh the token
      if (error.response && error.response.status === 401) {
        // Attempt to refresh the token
        const refreshResponse = await axios.post('http://localhost:8055/auth/refresh', {
          refresh_token: refreshToken,
        });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.data.access_token;
          const newRefreshToken = refreshResponse.data.data.refresh_token;

          // Store new tokens in localStorage
          localStorage.setItem('auth_token', newAccessToken);
          localStorage.setItem('refresh_token', newRefreshToken);

          // Retry the POST request with the new access token
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
        // Handle other errors
        console.error('Error creating farmer:', error.response ? error.response.data : error.message);
        alertMessage.value = 'An error occurred while creating the farmer.';
        return;
      }
    }

    // Log activity with email and reference number
    logActivity(email, `Added farmer with reference number: ${farmer.value.reference_number}`);

    // Show success alert
    alertMessage.value = 'Farmer Created Successfully!';

    // Redirect to farmers index page on success
    setTimeout(() => {
      router.push('/farmers/index');
    }, 5000); // Redirect after 5 seconds
  } catch (error) {
    console.error('Error submitting form:', error.response ? error.response.data : error.message);
    alertMessage.value = 'An error occurred while creating the farmer.';
  }
};


// Function to close the alert and navigate to farmers index
const closeAlert = () => {
  alertMessage.value = ''; // Clear the alert message
  router.push('/farmers/index');
};
</script>



<style scoped>
.create-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height */
  width: 100vw; /* Full width */
  background-color: #f2f4f7;
  overflow: hidden; /* Prevent scrolling */
}

.content-box {
  position: relative;
  padding: 2rem;
  background-color: #f2f4f7;
  margin-top: 2rem;
  border-radius: 8px;
  height: auto; /* Allowing flexibility in height */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Enable vertical scrolling */
}

.nav-buttons {
  display: flex;
  gap: 20px; /* Add space between buttons */
  flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
  margin-left: 60px;
}

.nav-button {
  background-color: #387e90; /* Initial background */
  color: white; /* Black text */
  border: none; /* No border */
  padding: 10px 20px; /* Padding for button */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer on hover */
  font-weight: bold; /* Bold text */
  transition: background-color 0.3s; /* Smooth transition */
}

.hover-green {
  background-color: #46cab6; /* Change background to green on hover */
  color: white; /* Change text color to white */
}

.submit-button {
  margin-top: 20px;
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer; /* Pointer on hover */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.submit-button:hover {
  background-color: darkgreen; /* Darker shade on hover */
}
.farm-location-input {
    width: 450px;
    display: block;
    margin: 5px auto 5px auto; /* Center horizontally */
    height: 35px;
}

.farm-location-input2 {
    width: 245px;
    height: 35px;
}
.ha {
    width: 70px;
}
.add-farm-table-button {
    background-color: #4CAF50; 
    color: white; 
    border: none; 
    padding: 10px 20px; 
    text-align: center; 
    text-decoration: none; 
    display: inline-block; 
    font-size: 16px; 
    margin: 20px 0; 
    cursor: pointer; 
    border-radius: 5px; 
    transition: background-color 0.3s; 
}

.add-farm-table-button:hover {
    background-color: #45a049; /* Darker green on hover */
}
.input-field1 {
    position: relative;
    height: 70px;
    /* height: 350px; */
}

.input-field1 select {
    border-radius: 6px;
    font-size: 15px;
    padding: 0 15px;
    border: 1px solid black;
    background: transparent;
    color: black;
    outline: none;
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none; /* Remove default arrow for Safari */
    width: 150px; 
    height: 50px;
}
.input-field1 input {
    width: 240px;
    height: 50px;
    border-radius: 6px;
    font-size: 15px;
    padding: 0 15px;
    border: 1px solid black;
    background: transparent;
    color: black;
    outline: none;
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none; /* Remove default arrow for Safari */
}
.input-field2 textarea {
    width: 150px;
    height: 350px;
    border-radius: 6px;
    font-size: 15px;
    padding: 0 15px;
    border: 1px solid black;
    background: transparent;
    color: black;
    outline: none;
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none; /* Remove default arrow for Safari */
}

.input-field1 .icon {
    position: absolute;
    right: 20px; /* Position the icon */
    top: 50%;
    transform: translateY(-50%); /* Center the icon vertically */
    font-size: 24px; /* Size of the icon */
    pointer-events: none; /* Allow clicks on select */
}


.input-field1 label {
    position: absolute;
    top: 35%;
    left: 15px;
    transform: translateY(-50%);
    color: black;
    font-size: 15px;
    pointer-events: none;
    transition: 0.3s;     
    }
    .black-select option {
    background-color: white;
    color: black;
  }

select:focus {
    border: 2px solid lightgreen;
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
  border: 2px solid lightgreen;
}

input:focus ~ label,
input:valid ~ label {
  top: 0;
  left: 15px;
  font-size: 14px;
  padding: 0 2px;
  background: #f2f4f7;
}
.arrow-down1 {
    position: absolute;
    top: 35%;
    right: 18px; 
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid black; 
    transform: translateY(-50%);
    pointer-events: none; 
}
.add-crops {
  color: white;
  background-color: #387e90;
  border-color: #387e90;
  border-radius: 5px;
  border: 1px solid #387e90;
  margin-bottom: 10px;
}
.add-crops:hover {
  background-color: #46cab6; /* Darker shade for hover effect */
  border-color: #46cab6;
  color: #f0f0f0; /* Light gray color for text on hover */
}

</style>
