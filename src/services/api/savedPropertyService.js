const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class SavedPropertyService {
  constructor() {
    this.savedProperties = [];
  }

  async getAll() {
    await delay(200);
    return [...this.savedProperties];
  }

  async getById(id) {
    await delay(150);
    const item = this.savedProperties.find(p => p.id === id);
    return item ? { ...item } : null;
  }

  async create(savedData) {
    await delay(250);
    const newSaved = {
      ...savedData,
      id: Date.now().toString(),
      savedDate: savedData.savedDate || new Date().toISOString()
    };
    this.savedProperties.push(newSaved);
    return { ...newSaved };
  }

  async update(id, savedData) {
    await delay(300);
    const index = this.savedProperties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Saved property not found');
    }
    this.savedProperties[index] = { ...this.savedProperties[index], ...savedData };
    return { ...this.savedProperties[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.savedProperties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Saved property not found');
    }
    const deleted = this.savedProperties.splice(index, 1)[0];
    return { ...deleted };
  }

  async removeByPropertyId(propertyId) {
    await delay(200);
    const index = this.savedProperties.findIndex(p => p.propertyId === propertyId);
    if (index === -1) {
      throw new Error('Saved property not found');
    }
    const deleted = this.savedProperties.splice(index, 1)[0];
    return { ...deleted };
  }

  async isSaved(propertyId) {
    await delay(100);
    return this.savedProperties.some(p => p.propertyId === propertyId);
  }
}

export default new SavedPropertyService();