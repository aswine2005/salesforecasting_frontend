// Import products from CSV
export const importProductsFromCsv = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No CSV file provided' });
    }

    const results = [];
    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    try {
        // Create readable stream from buffer
        const stream = Readable.from([req.file.buffer]);
        
        // Process the CSV data
        const parseStream = stream.pipe(csv());
        
        // We'll use this to collect all CSV rows before processing
        const productRows = [];
        
        // First collect all rows
        for await (const row of parseStream) {
            productRows.push(row);
        }
        
        // Then process them in batch
        if (productRows.length > 0) {
            // Validate and prepare all products
            const bulkOps = [];

            // For each product in the CSV
            for (const row of productRows) {
                try {
                    // Find category by name if provided
                    let categoryId = null;
                    if (row.category) {
                        const category = await Category.findOne({ name: row.category });
                        if (category) {
                            categoryId = category._id;
                        } else {
                            // If category not found, create a new one
                            const newCategory = new Category({ name: row.category });
                            await newCategory.save();
                            categoryId = newCategory._id;
                        }
                    }

                    // Create product object
                    const product = {
                        name: row.name,
                        description: row.description || '',
                        price: parseFloat(row.price) || 0,
                        initialStock: parseInt(row.initialStock) || 0,
                        currentStock: parseInt(row.initialStock) || 0,
                        category: categoryId
                    };

                    // Add to bulk operations
                    bulkOps.push({
                        insertOne: {
                            document: product
                        }
                    });
                } catch (error) {
                    errorCount++;
                    errors.push({
                        row: row,
                        error: error.message
                    });
                }
            }
            
            if (bulkOps.length > 0) {
                // Execute bulk operation
                const result = await Product.bulkWrite(bulkOps);
                successCount = result.insertedCount;
                
                // Add success result
                results.push({
                    status: 'success',
                    message: `Successfully imported ${successCount} products`
                });
            }
        }
        
        res.status(200).json({
            message: `Imported ${successCount} products with ${errorCount} errors`,
            successCount,
            errorCount,
            errors,
            results
        });
    } catch (error) {
        console.error('Error importing products:', error);
        res.status(500).json({ 
            message: 'Error importing products',
            error: error.message
        });
    }
};
