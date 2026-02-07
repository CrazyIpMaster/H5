
describe('Guochao H5 Main Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for preloader
    cy.contains('寻找好彩头...', { timeout: 10000 }).should('not.exist');
  });

  it('should navigate from Intro to Hub to Exploration to Creation', () => {
    // Level 1: Intro
    cy.contains('寻找好彩头').should('be.visible');
    // Click on a card (e.g., Sky)
    cy.contains('飞羽衔春').click();

    // Level 2: Hub
    cy.url().should('include', 'category=sky');
    cy.contains('天之卷').should('be.visible');
    
    // Go to Exploration
    cy.contains('探索图库').click();
    
    // Level 3: Exploration
    cy.contains('纹样素材').should('be.visible');
    // Select a pattern
    cy.get('[data-testid="pattern-card"]').first().click();
    cy.contains('去创作').click();

    // Level 4: Creation - Pattern Selector
    cy.contains('选择纹样').should('be.visible');
    cy.get('[data-testid="pattern-select-card"]').first().click();
    cy.contains('下一步').click();

    // Text Selector
    cy.contains('选择祝福').should('be.visible');
    cy.get('[data-testid="blessing-card"]').first().click();
    cy.contains('下一步').click();

    // Editor
    cy.contains('导出作品').should('be.visible');
    // Click Export
    cy.contains('导出作品').click();

    // Result
    cy.contains('你的好彩头').should('be.visible');
    // Check if image is generated
    cy.get('img[alt="Generated Poster"]').should('be.visible');
  });

  it('should support batch download in Exploration', () => {
    cy.visit('/?category=earth'); // Direct link to Hub if persisted
    // Actually we need to click through if app doesn't support deep link init properly without preloader
    // But assuming it does or we wait
    
    // Navigate to Exploration
    cy.contains('探索图库').click();
    
    // Toggle Batch Mode
    cy.contains('批量下载').click();
    
    // Select items
    cy.get('[data-testid="pattern-card"]').eq(0).click();
    cy.get('[data-testid="pattern-card"]').eq(1).click();
    
    // Download
    cy.contains('下载选中 (2)').click();
    
    // Verify download triggered (mock or check stub)
  });
});
