"use client"
import CategoriesInBoxLinear from "@/app/Components/CategoriesInBoxLinear/page";
import HomeImagesSlider from "@/app/Components/HomeImagesSlider/page";
import Navbar from "@/app/Components/Navbar/page";
import percent from "@/public/Images/categoryBoxes/percent.png";
import fire from "@/public/Images/categoryBoxes/fire.png";
import newImage from "@/public/Images/categoryBoxes/new.png";
import CourseSepeartor from "@/app/Components/CourseSepeartor/page";
import Categories from "@/app/Components/Categories/page";
import NeedConsulting from "@/app/Components/NeedConsulting/page";
import Comments from "@/app/Components/Comments/page";
import HomePageArticles from "@/app/Components/Articles/homePageArticles";
import Footer from "@/app/Components/Footer/page";
const Home = () => {
    return (
        <div>
            <Navbar />
            <HomeImagesSlider />
            <div className="grid grid-cols-3 w-[95%] mt-4 mx-auto justify-between gap-4">
                <CategoriesInBoxLinear text="پر طرفدار ها" image={percent} link="/Categories/New" />
                <CategoriesInBoxLinear text="جدیدترین ها" image={fire} link="/Categories/Trends" />
                <CategoriesInBoxLinear text="تخفیف ها" image={newImage} link="/Categories/Discounts" />
            </div>
            <CourseSepeartor typeName="دوره های ترند" url="http://127.0.0.1:8000/api/v1/trending-courses" />
            <Categories />
            <CourseSepeartor typeName="دوره های جدید" url="http://127.0.0.1:8000/api/v1/new-categories" />
            <NeedConsulting />
            <Comments />
            <HomePageArticles typeName="مقالات" url="http://127.0.0.1:8000/api/v1/get-six-articles" />
            <Footer />
        </div>
    );
};

export default Home;