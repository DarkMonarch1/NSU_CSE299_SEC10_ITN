import json
import logging
from sqlalchemy.orm import Session
from app.models import UserModel, AlumnusModel, CompanyModel, JobPostingModel, MagazineArticleModel
from app.services.data_loader import load_convocation_list, load_company_details
from app.services.seed_data import get_job_postings

logger = logging.getLogger("careersetu.seed")


def seed_database(db: Session) -> None:
    """
    Ingests CSV datasets into database tables if they are empty.
    """
    # 1. Seed Convocation Alumni Datasets
    if db.query(AlumnusModel).count() == 0:
        logger.info("Seeding Convocation Alumni datasets into Database...")
        convocations = [
            ("19th-convocation1.csv", "19th Convocation"),
            ("20th-convocation.csv", "20th Convocation"),
            ("Procession list_21st_Convocation_2018.csv", "21st Convocation"),
        ]
        alumni_objects = []
        for filename, batch_name in convocations:
            records = load_convocation_list(filename, batch_name)
            for item in records:
                alumnus = AlumnusModel(
                    id=item["id"],
                    nsu_id=item["nsuId"],
                    full_name=item["fullName"],
                    degree=item.get("degree", "B.S. in Computer Science"),
                    batch=batch_name,
                    procession=item.get("procession", ""),
                    department="Computer Science & Engineering",
                    cgpa="3.72" if "Arch" not in item.get("degree", "") else "3.55",
                    current_company="Pathao" if len(alumni_objects) % 3 == 0 else ("bKash" if len(alumni_objects) % 3 == 1 else "Brain Station 23"),
                    current_role="Software Engineer" if len(alumni_objects) % 2 == 0 else "Data Scientist",
                )
                alumni_objects.append(alumnus)
        if alumni_objects:
            db.bulk_save_objects(alumni_objects)
            db.commit()
            logger.info(f"Successfully seeded {len(alumni_objects)} alumni records.")

    # 2. Seed Companies Dataset
    if db.query(CompanyModel).count() == 0:
        logger.info("Seeding Company Details dataset into Database...")
        companies_raw = load_company_details()
        company_objects = []
        seen = set()
        for idx, row in enumerate(companies_raw):
            name = row.get("Company Name", "").strip() or row.get("Name", "").strip() or f"Company #{idx + 1}"
            if name in seen:
                continue
            seen.add(name)
            company_objects.append(
                CompanyModel(
                    name=name,
                    industry=row.get("Industry", "Technology & Software"),
                    location=row.get("Location", "Dhaka, Bangladesh"),
                    verified=True,
                    trust_score=95,
                    website=row.get("Website", f"https://{name.lower().replace(' ', '')}.com"),
                )
            )
        if company_objects:
            db.bulk_save_objects(company_objects)
            db.commit()
            logger.info(f"Successfully seeded {len(company_objects)} company records.")

    # 3. Seed Job Postings
    if db.query(JobPostingModel).count() == 0:
        logger.info("Seeding Initial Job Postings into Database...")
        default_jobs = get_job_postings()
        job_objects = []
        for job in default_jobs:
            job_obj = JobPostingModel(
                id=job["id"],
                slug=job["slug"],
                title=job["title"],
                company=job["company"],
                location=job["location"],
                work_type=job["workType"],
                category=job["category"],
                salary=job["salary"],
                department_target=job["departmentTarget"],
                target_convocation=job["targetConvocation"],
                trust_score=job["trustScore"],
                ai_match_score=job["aiMatchScore"],
                description=job["description"],
                requirements_json=json.dumps(job.get("requirements", [])),
                responsibilities_json=json.dumps(job.get("responsibilities", [])),
                benefits_json=json.dumps(job.get("benefits", [])),
                posted_by=job.get("postedBy", "NSU Recruiter"),
                posted_date=job.get("postedDate", "2026-08-18"),
                application_count=job.get("applicationCount", 5),
                is_featured=job.get("isFeatured", True),
                company_verified=job.get("companyVerified", True),
            )
            job_objects.append(job_obj)
        if job_objects:
            db.bulk_save_objects(job_objects)
            db.commit()
            logger.info(f"Successfully seeded {len(job_objects)} job postings.")

    # 4. Seed Default System Users
    if db.query(UserModel).count() == 0:
        logger.info("Seeding Default Users into Database...")
        from app.auth_utils import hash_password

        users = [
            UserModel(
                email="admin@northsouth.edu",
                password_hash=hash_password("admin123"),
                full_name="NSU Career Admin",
                role="admin",
                nsu_id="ADMIN001",
                department="Computer Science & Engineering",
            ),
            UserModel(
                email="alumni@northsouth.edu",
                password_hash=hash_password("alumni123"),
                full_name="Tanvir Ahmed",
                role="alumni",
                nsu_id="1910923",
                department="Computer Science & Engineering",
            ),
            UserModel(
                email="recruiter@pathao.com",
                password_hash=hash_password("employer123"),
                full_name="Pathao Talent Acquisition",
                role="employer",
                nsu_id="EMP001",
                department="Human Resources",
            ),
        ]
        db.add_all(users)
        db.commit()
        logger.info("Successfully seeded default system users.")
