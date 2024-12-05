<template>
  <div class="edit-container">
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
      <div class="personal-info-sections">
        <!-- Personal Information I -->
        <div v-if="isHovered === 1" id="personalInfoI" class="personal-info-section">
          <form @submit.prevent="submitForm">
            <div class="row mb-3">
              <div class="input-field">
                <select v-model="farmer.enrollment_type" spellcheck="false" class="black-select">
                  <option value="New">New</option>
                  <option value="Updating">Updating</option>
                </select>
                <label>Enrollment Type:</label>
                <span class="arrow-down"></span>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.reference_number"
                  required
                  spellcheck="false"
                />
                <label>Reference Number:</label>
              </div>
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
                  required
                  spellcheck="false"
                />
                <label>EXTENSION NAME:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.sex" spellcheck="false" class="black-select">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="Other">Other</option>
                  <option v-if="farmer.sex && !['male', 'female', 'Other'].includes(farmer.sex)" :value="farmer.sex">
                    {{ farmer.sex }}
                  </option>
                </select>
                <label>Gender:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="farmer.sex && farmer.sex !== 'male'  && farmer.sex !== 'female'" class="input-field">
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
                />
                <label>MOBILE NUMBER:</label>
              </div>
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
                <select v-model="farmer.religion" spellcheck="false" class="black-select">
                  <option value="christianity">Christianity</option>
                  <option value="islam">Islam</option>
                  <option value="Other">Other</option>
                  <option v-if="farmer.religion && !['christianity', 'islam', 'Other'].includes(farmer.religion)" :value="farmer.religion">
                    {{ farmer.religion }}
                  </option>
                </select>
                <label>RELIGION:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="farmer.religion && farmer.religion !== 'christianity'  && farmer.religion !== 'islam'" class="input-field">
                <input type="text" v-model="farmer.religion" spellcheck="false" />
                <label>Please specify your religion:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.civil_status" spellcheck="false" class="black-select">
                  <option value="single">single</option>
                  <option value="married">married</option>
                  <option value="widowed">widowed</option>
                  <option value="separated">separated</option>
                  <option value="Other">Other</option>
                  <option v-if="farmer.civil_status && !['single', 'married','widowed','separated', 'Other'].includes(farmer.civil_status)" :value="farmer.civil_status">
                    {{ farmer.civil_status }}
                  </option>
                </select>
                <label>CIVIL STATUS:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="farmer.civil_status && farmer.civil_status !== 'single' && farmer.civil_status !== 'married'  && farmer.civil_status !== 'widowed'&& farmer.civil_status !== 'separated'" class="input-field">
                <input type="text" v-model="farmer.civil_status" spellcheck="false" />
                <label>Please specify your civil status:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.name_of_spouse_if_married"
                  spellcheck="false"
                />
                <label>NAME OF SPOUSE IF MARRIED:</label>
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
                <select v-model="farmer.household_heads" spellcheck="false" class="black-select">
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.household_heads && !['yes', 'no'].includes(farmer.household_heads)" :value="farmer.household_heads">
                    {{ farmer.household_heads }}
                  </option>
                </select>
                <label>HOUSEHOLD HEADS:</label>
                <span class="arrow-down"></span>
              </div>
              
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="text"
                  v-model="farmer.if_no_name_of_household_heads"
                  spellcheck="false"
                />
                <label>IF NO, NAME OF HOUSEHOLD HEADS:</label>
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
                  type="text"
                  v-model="farmer.no_of_living_household_members"
                  spellcheck="false"
                />
                <label>NO. OF LIVING HOUSEHOLD HEADS:</label>
              </div>
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="text"
                  v-model="farmer.no_of_male"
                  spellcheck="false"
                />
                <label>NO. OF MALE:</label>
              </div>
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="text"
                  v-model="farmer.no_of_female"
                  spellcheck="false"
                />
                <label>NO. OF FEMALE:</label>
              </div>
              
              <div class="input-field">
                <select v-model="farmer.highest_formal_education" spellcheck="false" class="black-select">
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
                  <option v-if="farmer.highest_formal_education && !['pre-school', 'elementary','high school (non K-12)','junior high school (K-12)','senior high school (K-12)','college','vocational','post-graduate', 'Other'].includes(farmer.highest_formal_education)" :value="farmer.highest_formal_education">
                    {{ farmer.highest_formal_education }}
                  </option>
                </select>
                <label>HIGHEST FORMAL EDUCATION:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="farmer.highest_formal_education && !['pre-school', 'elementary','high school (non K-12)','junior high school (K-12)','senior high school (K-12)','college','vocational','post-graduate','none' ].includes(farmer.highest_formal_education)" :value="farmer.highest_formal_education" class="input-field">
                <input type="text" v-model="farmer.highest_formal_education" spellcheck="false" />
                <label>Please specify your Highest Formal Educ:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.person_with_disability" spellcheck="false" class="black-select">
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.person_with_disability && !['yes', 'no',].includes(farmer.person_with_disability)" :value="farmer.person_with_disability">
                    {{ farmer.person_with_disability }}
                  </option>
                </select>
                <label>PERSON WITH DISABILITY:</label>
                <span class="arrow-down"></span>
              </div>
              <div class="input-field">
                <select v-model="farmer.IVps_beneficiary" spellcheck="false" class="black-select">
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.IVps_beneficiary && !['yes', 'no',].includes(farmer.IVps_beneficiary)" :value="farmer.IVps_beneficiary">
                    {{ farmer.IVps_beneficiary }}
                  </option>
                </select>
                <label>IVps BENEFICIARY:</label>
                <span class="arrow-down"></span>
              </div>
              <div class="input-field">
                <select v-model="farmer.member_of_an_indiginous_group" spellcheck="false" class="black-select">
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.member_of_an_indiginous_group && !['yes', 'no',].includes(farmer.member_of_an_indiginous_group)" :value="farmer.member_of_an_indiginous_group">
                    {{ farmer.member_of_an_indiginous_group }}
                  </option>
                </select>
                <label>MEMBER OF INDIGINOUS GROUP:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="showAdditionalInputIndi" class="input-field">
                <input
                  type="text"
                  v-model="farmer.member_of_an_indiginous_group_if_yes_specify"
                  spellcheck="false"
                />
                <label>SPECIFY YOUR INDIGINOUS GROUP:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.with_government_id" spellcheck="false" class="black-select">
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.with_government_id && !['yes', 'no',].includes(farmer.with_government_id)" :value="farmer.with_government_id">
                    {{ farmer.with_government_id }}
                  </option>
                </select>
                <label>WITH GOVERNMENT ID:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="showAdditionalInputID" class="input-field">
                <input
                  type="text"
                  v-model="farmer.if_yes_specify_id_type"
                  spellcheck="false"
                />
                <label>SPECIFY YOUR ID:</label>
              </div>
              <div v-if="showAdditionalInputID" class="input-field">
                <input
                  type="text"
                  v-model="farmer.id_number"
                  spellcheck="false"
                />
                <label>ID NUMBER:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.member_of_any_farmers_association_cooperative" spellcheck="false" class="black-select">
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.member_of_any_farmers_association_cooperative && !['yes', 'no',].includes(farmer.member_of_any_farmers_association_cooperative)" :value="farmer.member_of_any_farmers_association_cooperative">
                    {{ farmer.member_of_any_farmers_association_cooperative }}
                  </option>
                </select>
                <label>MEMBER OF ANY FARMERS ASSOCIATION:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="showAdditionalInputFarmerAsso" class="input-field">
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
                  spellcheck="false"
                />
                <label>PERSON TO NOTIFY INCASE OF IMERGENCY:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.contact_number"
                  spellcheck="false"
                />
                <label>CONTACT NUMBER:</label>
              </div>
            </div>
            <button class="next-button" style="display: block; margin: 0 auto;" @click="changeHover(2)">Next</button>
          </form>
        </div>


          <!-- Personal Information IV -->
        <div v-if="isHovered === 2" id="personalInfoIV" class="personal-info-section">
          <div class="row mb-3">
            <h1 style="color: black;">Main Livelihood</h1>
            <nav class="navbar">
            <div class="navbar-content">
              <div class="checkbox-group">
                <div class="checkbox-list">
                  <label v-for="option in livelihoodOptions" :key="option">
                    <input type="checkbox" :value="option" v-model="farmer.main_livelihood" />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </nav>
        <!-- Farming Activity checkboxes -->
        <div class="check-box">
          <label class="farming-activity-label">TYPE OF FARMING ACTIVITY:</label>
          <div v-for="activity in farmingActivityOptions" :key="activity">
            <label>
              <input 
                type="checkbox" 
                :value="activity" 
                v-model="farmer.type_of_farming_activity" 
              />
              {{ activity.replace('_', ' ').toLowerCase() }} <!-- Format activity names -->
            </label>
            
            <!-- Input box for "Other crops" -->
            <div v-if="activity === 'Other crops' && farmer.type_of_farming_activity.includes('Other crops')" class="input-field2">
              <input 
                type="text" 
                id="otherCrops" 
                v-model="farmer.other_crop_specify" 
                placeholder="Please Specify" 
              />
            </div>
            <div v-if="activity === 'Livestock' && farmer.type_of_farming_activity.includes('Livestock')" class="input-field2">
              <input 
                type="text" 
                id="otherCrops" 
                v-model="farmer.livestock_specify" 
                placeholder="Please Specify" 
              />
            </div>
            <div v-if="activity === 'Poultry' && farmer.type_of_farming_activity.includes('Poultry')" class="input-field2">
              <input 
                type="text" 
                id="otherCrops" 
                v-model="farmer.poultry_specify" 
                placeholder="Please Specify" 
              />
            </div>
            <div v-if="activity === 'Other, please specify' && farmer.type_of_farming_activity.includes('Other, please specify')" class="input-field2">
              <input 
                type="text" 
                id="otherCrops" 
                v-model="farmer.type_of_farming_activities_other" 
                placeholder="Please Specify" 
              />
            </div>
          </div>
        </div>

        <div class="check-box">
          <label class="farming-activity-label">FOR FARMWORKERS:</label>
          <div v-for="task in farmworkerTaskOptions" :key="task">
            <label>
              <input 
                type="checkbox" 
                :value="task" 
                v-model="farmer.farmworkers_kind_of_work" 
              />
              {{ task.replace('_', ' ').toLowerCase() }}
            </label>
            
            <!-- Input box for "Other, please specify" -->
            <div v-if="task === 'Other, please specify' && farmer.farmworkers_kind_of_work.includes('Other, please specify')" class="input-field2">
              <input 
                type="text" 
                id="otherTask" 
                v-model="farmer.for_farmworkers_other" 
                placeholder="Please Specify" 
              />
            </div>
          </div>
        </div>

        <div class="check-box">
          <label class="farming-activity-label">FOR FISHERFOLK:</label>
          <div v-for="task in fishfolkTaskOptions" :key="task">
            <label>
              <input 
                type="checkbox" 
                :value="task" 
                v-model="farmer.for_fisherfolk" 
              />
              {{ task.replace('_', ' ').toLowerCase() }}
            </label>
            
            <!-- Input box for "Other, please specify" -->
            <div v-if="task === 'Other, please specify' && farmer.for_fisherfolk.includes('Other, please specify')" class="input-field2">
              <input 
                type="text" 
                id="otherFishfolkTask" 
                v-model="farmer.for_fishfolk_other" 
                placeholder="Please Specify" 
              />
            </div>
          </div>
        </div>

          <div class="check-box">
            <label class="farming-activity-label">AGRI YOUTH:</label>
            <div v-for="task in agriYouthTaskOptions" :key="task">
              <label>
                <input 
                  type="checkbox" 
                  :value="task" 
                  v-model="farmer.for_agri_youth" 
                />
                {{ task.replace('_', ' ').toLowerCase() }}
              </label>
              
              <!-- Input box for "Other, please specify" -->
              <div v-if="task === 'Other, please specify' && farmer.for_agri_youth.includes('Other, please specify')" class="input-field2">
                <input 
                  type="text" 
                  id="otherAgriYouthTask" 
                  v-model="farmer.for_agri_youth_other" 
                  placeholder="Please Specify" 
                />
              </div>
            </div>
          </div>
      
          </div>
          <div class="row mb-3">
            <div class="input-field" v-if="Array.isArray(farmer.type_of_farming_activity) && farmer.type_of_farming_activity.includes('type_of_farming_activities_other')">
              <input
                type="text"
                v-model="farmer.type_of_farming_activities_other"
                spellcheck="false"
              />
              <label>Other, For Type of Activity:</label>
            </div>

          </div>
          <div class="button-container">
          <button class="preview-button" @click="changeHover(1)">Preview</button>
          <button class="next-button" @click="changeHover(3)">Next</button>
        </div>
        </div>

        <div v-if="isHovered === 3" id="personalInfoIV" class="personal-info-section">
          <button type="button" @click="addFarmTable" class="add-farm-table-button">Add Farm Parcel No.</button>
          <form @submit.prevent="submitForm">
            <div class="table-container">
                <!-- Table 1 -->
                <table id="farmTable1">
                    <thead>
                        <tr>
                            <th>Farm Parcel No.</th>
                            <th>Farm Land Dx  escription</th>
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
                                    <input type="text" v-model="farmer.farm_location_brgy1" class="farm-location-input">
                                    <div style="text-align: center;">Barangay</div>
                                    <input type="text" v-model="farmer.farm_location_city_muni1" class="farm-location-input">
                                    <div style="text-align: center;">City/Municipality</div>
                                    <br>
                                    <b>Total Farm Area (in hectares):</b> <input type="number" v-model="totalSizeHa" class="ha" readonly> ha <br>
                                    <b>Within Ancestral Domain:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.ancestral_domain_1" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Document No.:</b> <input type="text" v-model="farmer.ownership_document_no_1" class="farm-location-input2"> <br>
                                    <b>Agrarian Reform Beneficiary:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.agrarian_reform_1" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Type:</b>
                                    <label v-for="task in OwnershipTypeTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.registered_owner_1" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    Tenant(Name of Land Owner: <input type="text" v-model="farmer.tenant_1" class="farm-location-input2">)<br>
                                    Lessee(Name of Land Owner: <input type="text" v-model="farmer.lessee_1" class="farm-location-input2">)
                                </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_1" spellcheck="false"/>
                                <label>Crops / Commodity (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_2" spellcheck="false"/>
                                <label>Crops / Commodity (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_3" spellcheck="false" />
                                <label>Crops / Commodity (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_4" spellcheck="false" />
                                <label>Crops / Commodity (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_5" spellcheck="false" />
                                <label>Crops / Commodity (5):</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_1" spellcheck="false" step="any" />
                                <label>Size (ha) (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_2" spellcheck="false" step="any" />
                                <label>Size (ha) (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_3" spellcheck="false" step="any" />
                                <label>Size (ha) (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_4" spellcheck="false" step="any" />
                                <label>Size (ha) (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_5" spellcheck="false" step="any" />
                                <label>Size (ha) (5):</label>
                              </div>
                              <div class="total-size">
                                <p>Total Size (ha): {{ totalSizeHa }}</p>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.no_of_head1_1" spellcheck="false" step="any" />
                                <label>No. of Heads (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_2" spellcheck="false" step="any" />
                                <label>No. of Heads (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_3" spellcheck="false" step="any" />
                                <label>No. of Heads (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_4" spellcheck="false" step="any" />
                                <label>No. of Heads (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_5" spellcheck="false" step="any" />
                                <label>No. of Heads (5):</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field2">
                                <select v-model="farmer.farm_type1" spellcheck="false" class="black-select">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option v-if="farmer.farm_type1 && !['1', '2', '3'].includes(farmer.farm_type1)" :value="farmer.farm_type1">
                                    {{ farmer.farm_type1 }}
                                  </option>
                                </select>
                                <!-- <label>Farm Type:</label> -->
                                <span class="arrow-down"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field2">
                                <select v-model="farmer.organic_practitioner1" spellcheck="false" class="black-select">
                                  <option value="yes">yes</option>
                                  <option value="no">no</option>
                                  <option v-if="farmer.organic_practitioner1 && !['yes', 'no'].includes(farmer.organic_practitioner1)" :value="farmer.organic_practitioner1">
                                    {{ farmer.organic_practitioner1 }}
                                  </option>
                                </select>
                                <!-- <label>Practitioner:</label> -->
                                <span class="arrow-down"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field3">
                                <textarea type="text" v-model="farmer.remarks1" spellcheck="false"/>
                              </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table v-if="showFarmTable2" id="farmTable2">
                    <thead>
                        <tr>
                          <th>Farm Parcel No.</th>
                            <th>Farm Land Dx  escription</th>
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
                                    <b>Total Farm Area (in hectares):</b> <input type="number" v-model="totalSizeHa2" class="ha" readonly> ha <br>
                                    <b>Within Ancestral Domain:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.ancestral_domain_2" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Document No.:</b> <input type="text" v-model="farmer.ownership_document_no_2" class="farm-location-input2"> <br>
                                    <b>Agrarian Reform Beneficiary:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.agrarian_reform_2" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Type:</b>
                                    <label v-for="task in OwnershipTypeTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.registered_owner_2" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    Tenant(Name of Land Owner: <input type="text" v-model="farmer.tenant_2" class="farm-location-input2">)<br>
                                    Lessee(Name of Land Owner: <input type="text" v-model="farmer.lessee_2" class="farm-location-input2">)
                                </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity2_1" spellcheck="false"/>
                                <label>Crops / Commodity (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity2_2" spellcheck="false"/>
                                <label>Crops / Commodity (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity2_3" spellcheck="false" />
                                <label>Crops / Commodity (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity2_4" spellcheck="false" />
                                <label>Crops / Commodity (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity2_5" spellcheck="false" />
                                <label>Crops / Commodity (5):</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa2_1" spellcheck="false" step="any" />
                                <label>Size (ha) (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa2_2" spellcheck="false" step="any" />
                                <label>Size (ha) (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa2_3" spellcheck="false" step="any" />
                                <label>Size (ha) (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa2_4" spellcheck="false" step="any" />
                                <label>Size (ha) (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa2_5" spellcheck="false" step="any" />
                                <label>Size (ha) (5):</label>
                              </div>
                              <div class="total-size">
                                <p>Total Size (ha): {{ totalSizeHa }}</p>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.no_of_head2_1" spellcheck="false" step="any" />
                                <label>No. of Heads (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head2_2" spellcheck="false" step="any" />
                                <label>No. of Heads (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head2_3" spellcheck="false" step="any" />
                                <label>No. of Heads (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head2_4" spellcheck="false" step="any" />
                                <label>No. of Heads (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head2_5" spellcheck="false" step="any" />
                                <label>No. of Heads (5):</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field2">
                                <select v-model="farmer.farm_type2" spellcheck="false" class="black-select">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option v-if="farmer.farm_type2 && !['1', '2', '3'].includes(farmer.farm_type2)" :value="farmer.farm_type2">
                                    {{ farmer.farm_type2 }}
                                  </option>
                                </select>
                                <!-- <label>Farm Type:</label> -->
                                <span class="arrow-down"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field2">
                                <select v-model="farmer.organic_practitioner2" spellcheck="false" class="black-select">
                                  <option value="yes">yes</option>
                                  <option value="no">no</option>
                                  <option v-if="farmer.organic_practitioner2 && !['yes', 'no'].includes(farmer.organic_practitioner2)" :value="farmer.organic_practitioner2">
                                    {{ farmer.organic_practitioner2 }}
                                  </option>
                                </select>
                                <!-- <label>Practitioner:</label> -->
                                <span class="arrow-down"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field3">
                                <textarea type="text" v-model="farmer.remarks2" spellcheck="false"/>
                              </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table v-if="showFarmTable3" id="farmTable3">
                    <thead>
                        <tr>
                          <th>Farm Parcel No.</th>
                            <th>Farm Land Dx  escription</th>
                            <th>CROP/COMMODITY <br>(Rice/Corn/HVC/Livestock/Poultry/Agri-fishery) <br> For Livestock & Poultry <br>(specify type of animal)</th>
                            <th>SIZE (ha)</th>
                            <th>No. of Head <br>(For Livestock and Poultry)</th>
                            <th>Farm Type</th>
                            <th>Organic Practitioner <br>(Y/N)</th>
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
                                    <b>Total Farm Area (in hectares):</b> <input type="number" v-model="totalSizeHa3" class="ha" readonly> ha <br>
                                    <b>Within Ancestral Domain:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.ancestral_domain_3" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Document No.:</b> <input type="text" v-model="farmer.ownership_document_no_3" class="farm-location-input2"> <br>
                                    <b>Agrarian Reform Beneficiary:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.agrarian_reform_3" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Type:</b>
                                    <label v-for="task in OwnershipTypeTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.registered_owner_3" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    Tenant(Name of Land Owner: <input type="text" v-model="farmer.tenant_3" class="farm-location-input2">)<br>
                                    Lessee(Name of Land Owner: <input type="text" v-model="farmer.lessee_3" class="farm-location-input2">)
                                </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity3_1" spellcheck="false"/>
                                <label>Crops / Commodity (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity3_2" spellcheck="false"/>
                                <label>Crops / Commodity (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity3_3" spellcheck="false" />
                                <label>Crops / Commodity (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity3_4" spellcheck="false" />
                                <label>Crops / Commodity (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity3_5" spellcheck="false" />
                                <label>Crops / Commodity (5):</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa3_1" spellcheck="false" step="any" />
                                <label>Size (ha) (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa3_2" spellcheck="false" step="any" />
                                <label>Size (ha) (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa3_3" spellcheck="false" step="any" />
                                <label>Size (ha) (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa3_4" spellcheck="false" step="any" />
                                <label>Size (ha) (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa3_5" spellcheck="false" step="any" />
                                <label>Size (ha) (5):</label>
                              </div>
                              <div class="total-size">
                                <p>Total Size (ha): {{ totalSizeHa }}</p>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.no_of_head3_1" spellcheck="false" step="any" />
                                <label>No. of Heads (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head3_2" spellcheck="false" step="any" />
                                <label>No. of Heads (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head3_3" spellcheck="false" step="any" />
                                <label>No. of Heads (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head3_4" spellcheck="false" step="any" />
                                <label>No. of Heads (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head3_5" spellcheck="false" step="any" />
                                <label>No. of Heads (5):</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field2">
                                <select v-model="farmer.farm_type3" spellcheck="false" class="black-select">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option v-if="farmer.farm_type3 && !['1', '2', '3'].includes(farmer.farm_type3)" :value="farmer.farm_type3">
                                    {{ farmer.farm_type3 }}
                                  </option>
                                </select>
                                <!-- <label>Farm Type:</label> -->
                                <span class="arrow-down"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field2">
                                <select v-model="farmer.organic_practitioner3" spellcheck="false" class="black-select">
                                  <option value="yes">yes</option>
                                  <option value="no">no</option>
                                  <option v-if="farmer.organic_practitioner3 && !['yes', 'no'].includes(farmer.organic_practitioner3)" :value="farmer.organic_practitioner3">
                                    {{ farmer.organic_practitioner3 }}
                                  </option>
                                </select>
                                <!-- <label>Practitioner:</label> -->
                                <span class="arrow-down"></span>
                              </div>
                            </td>
                            <td>
                              <div class="input-field3">
                                <textarea type="text" v-model="farmer.remarks3" spellcheck="false"/>
                              </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="button-container">
                  <button class="preview1-button" @click="changeHover(2)">Preview</button>
                  <button type="submit" class="submit-button" >Update</button> 
                </div>
            </div>
          </form>
        </div>
        <div v-if="alertMessage" class="alert-box">
          <i class="fa-regular fa-circle-check fa-5x" style="color: #63E6BE;"></i>
          <h1>Success</h1>
          <p>{{ alertMessage }}</p>
          <button @click="closeAlert">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'; 
import { useRouter, useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const isHovered = ref(1);
const alertMessage = ref(''); 
const showFarmTable2 = ref(false);
const showFarmTable3 = ref(false); 
// const showAdditionalInput = ref(false);

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

const totalSizeHa = computed(() => {
  return (
    (parseFloat(farmer.value.sizeHa1_1) || 0) +
    (parseFloat(farmer.value.sizeHa1_2) || 0) +
    (parseFloat(farmer.value.sizeHa1_3) || 0) +
    (parseFloat(farmer.value.sizeHa1_4) || 0) +
    (parseFloat(farmer.value.sizeHa1_5) || 0)
  );
});

const totalSizeHa2 = computed(() => {
  return (
    (parseFloat(farmer.value.sizeHa2_1) || 0) +
    (parseFloat(farmer.value.sizeHa2_2) || 0) +
    (parseFloat(farmer.value.sizeHa2_3) || 0) +
    (parseFloat(farmer.value.sizeHa2_4) || 0) +
    (parseFloat(farmer.value.sizeHa2_5) || 0)
  );
});
const totalSizeHa3 = computed(() => {
  return (
    (parseFloat(farmer.value.sizeHa3_1) || 0) +
    (parseFloat(farmer.value.sizeHa3_2) || 0) +
    (parseFloat(farmer.value.sizeHa3_3) || 0) +
    (parseFloat(farmer.value.sizeHa3_4) || 0) +
    (parseFloat(farmer.value.sizeHa3_5) || 0)
  );
});

// Data object to store farmer details
const farmer = ref({
  enrollment_type: '',
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
  mobile_number: '',
  landline_number: '',
  date_of_birth: '',
  place_of_birth: '',
  religion: '',
  civil_status: '',
  name_of_spouse_if_married: '',
  mothers_maiden_name: '',
  household_heads: 'no',
  if_no_name_of_household_heads: '',
  relationship: '',
  no_of_living_household_members: '',
  no_of_male: '',
  no_of_female: '',
  highest_formal_education: '',
  person_with_disability: '',
  IVps_beneficiary: '',
  member_of_an_indiginous_group: 'no',
  member_of_an_indiginous_group_if_yes_specify: '',
  with_government_id: '',
  if_yes_specify_id_type: '',
  id_number: '',
  member_of_any_farmers_association_cooperative: '',
  if_yes_spefify_farmers_association: '',
  person_to_notify_in_case_of_emergency: '',
  contact_number: '',
  main_livelihood: [],
  type_of_farming_activity:[],
  farmworkers_kind_of_work: [],
  for_fisherfolk:[],
  for_agri_youth:[],
  type_of_farming_activities_other:'',
  other_crop_specify: '',
  livestock_specify: '',
  poultry_specify: '',
  for_farmworkers_other: '',
  for_fishfolk_other: '',
  for_agri_youth_other: '',

});

const showAdditionalInput = ref(false);
const showAdditionalInputIndi = ref(false);
const showAdditionalInputID = ref(false);
const showAdditionalInputFarmerAsso = ref(false);

// Watch for changes in the household_heads value
watch(
  () => ({
    householdHeads: farmer.value.household_heads,
    indigenousGroup: farmer.value.member_of_an_indiginous_group,
    governmentID: farmer.value.with_government_id,
    farmersAssociation: farmer.value.member_of_any_farmers_association_cooperative
  }),
  ({ householdHeads, indigenousGroup, governmentID, farmersAssociation }) => {
    showAdditionalInput.value = householdHeads === 'yes';
    showAdditionalInputIndi.value = indigenousGroup === 'yes';
    showAdditionalInputID.value = governmentID === 'yes';
    showAdditionalInputFarmerAsso.value = farmersAssociation === 'yes';
  },
  { immediate: true }
);



// List of checkboxes for main livelihood
const livelihoodOptions = [
  'farmer',
  'farmworker/laborer',
  'fisherfolk',
  'agri youth'
];
const farmingActivityOptions = [
  'rice',
  'corn',
  'Other crops',
  'Livestock',
  'Poultry',
  'Other, please specify',
];
const farmworkerTaskOptions = [
  'land preparation',
  'planting / transplanting',
  'cultivation',
  'harvesting',
  'Other, please specify'
];
const fishfolkTaskOptions = [
  'fish capture',
  'aquaculture',
  'gleaning',
  'fish processing',
  'fish vending',
  'Other, please specify'
];
const agriYouthTaskOptions = [
  'part of a farming household',
  'attending attended formal agri fishery related course',
  'attending attended non formal agri fishery related course',
  'participated in any agricultural activity program',
  'Other, please specify'
];

const AncestralDomainTaskOptions = [
  'yes',
  'no'
];

const OwnershipTypeTaskOptions = [
  'Register Owner',
  'Others'
];

// Fetch farmer details from Directus database
const fetchFarmerDetails = async () => {
  try {
    const farmerId = route.params.id; // Assuming the route includes the farmer ID
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      alert('No authentication token found. Please log in again.');
      return;
    }

    const response = await axios.get(`http://localhost:8055/items/farmers/${farmerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Set the fetched data to the farmer object
    Object.assign(farmer.value, response.data.data);
  } catch (error) {
    console.error('Error fetching farmer details:', error.response ? error.response.data : error.message);
    alert('An error occurred while fetching the farmer details.');
  }
};

// On mounted, fetch the farmer data
onMounted(() => {
  fetchFarmerDetails();
});

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
const submitForm = async () => {
  try {
    const farmerId = route.params.id; // Farmer ID from route
    const token = localStorage.getItem('auth_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const email = localStorage.getItem('email');

    if (!token || !email) {
      alert('No authentication token or email found. Please log in again.');
      return;
    }

    let response;
    try {
      // Attempt PATCH request with the current token
      response = await axios.patch(`http://localhost:8055/items/farmers/${farmerId}`, farmer.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      // Handle token refresh logic if required
      if (error.response && error.response.status === 401) {
        const refreshResponse = await axios.post('http://localhost:8055/auth/refresh', {
          refresh_token: refreshToken,
        });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.data.access_token;
          const newRefreshToken = refreshResponse.data.data.refresh_token;

          // Update tokens in localStorage
          localStorage.setItem('auth_token', newAccessToken);
          localStorage.setItem('refresh_token', newRefreshToken);

          // Retry the PATCH request
          response = await axios.patch(`http://localhost:8055/items/farmers/${farmerId}`, farmer.value, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              'Content-Type': 'application/json',
            },
          });
        } else {
          alert('Session expired. Please log in again.');
          window.location.href = '/';
          return;
        }
      } else {
        console.error('Error updating farmer:', error.response ? error.response.data : error.message);
        alert('An error occurred while updating the farmer.');
        return;
      }
    }

    // Log activity
    logActivity(email, `Updated farmer with reference number: ${farmer.value.reference_number}`);

    // Show success alert
    alertMessage.value = 'Farmer Updated Successfully!';

    // Optionally redirect or allow the user to stay
    setTimeout(() => {
      // Uncomment the following line to redirect, or leave it commented to stay on the page
      // router.push('/farmers/index'); 
    }, 2000);
  } catch (error) {
    console.error('Error updating farmer:', error.response ? error.response.data : error.message);
    alert('An error occurred while updating the farmer.');
  }
};


    // Close the alert and navigate to farmers index
    const closeAlert = () => {
      alertMessage.value = ''; // Clear the alert message
      router.push('/farmers/index'); // Navigate to the farmers index page
    };

    const changeHover = (index) => {
  isHovered.value = index; 
};
</script>

<style scoped>
/* Styling similar to create.vue */
.edit-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f2f4f7;
  overflow: hidden;
}

.content-box {
  padding: 2rem;
  background-color: #f2f4f7;
  margin-top: 2rem;
  border-radius: 8px;
  height: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Enable vertical scrolling */
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
  cursor: pointer; /* Pointer on hover */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.submit-button:hover {
  background-color: darkgreen;
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
.input-field2 select {
    width: 150px;
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
.input-field3 textarea {
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
    background-color: #F8F9FA;
    color: black;
  }

  input:focus {
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
    outline: none; /* Remove the green outline entirely */
    box-shadow: 0 0 5px #f8f9fa; /* Add a light green glow instead */
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
    border-top: 5px solid white; 
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
.button-container {
  display: flex;
  justify-content: center; /* Center the buttons horizontally */
  gap: 10px; /* Add spacing between buttons */
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
.input-field2 input {
    width: 210px;
    height: auto;
    font-size: 15px;
    padding: 5px 0;
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
    color: black;
    outline: none; /* Removes the default focus outline */
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none; /* Remove default arrow for Safari */
    transition: border-color 0.3s ease; /* Smooth transition for focus effect */
}
</style>
