import Company from "../models/companyModel.js";

export const registerCompanyController = async (req, res) => {
  try {
    const { name, website } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(409).json({
        message: "Company is already registered",
        success: false,
      });
    }

    const company = await Company.create({
      name,
      website,
      logo: req.file ? req.file.filename : null,
      userId: req.user._id,
    });

    return res.status(201).json({
      message: "Company successfully registered",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};


export const getCompanyController = async (req, res) => {
    try {
        const userId = req.user;

        const companies = await Company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Companies successfully fetched",
            companies,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};

export const getSingleCompanyController = async (req,res) => {
    try {
        
        const {companyId} = req.params;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(401).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Company sucessfully fetched",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Something went wrong",
            success: false
        })
    }

}


export const updateCompanyController = async (req, res) => {
    try {
        const { name, description, location, website } = req.body;

        const updatedData = {};
        if (name) updatedData.name = name;
        if (description) updatedData.description = description;
        if (location) updatedData.location = location;
        if (website) updatedData.website = website;

        const company = await Company.findByIdAndUpdate(
            req.params.id,        // ✅ FIXED
            updatedData,
            { new: true, runValidators: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company successfully updated",
            company,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};
