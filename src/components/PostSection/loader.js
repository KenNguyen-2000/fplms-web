import { Card, CardHeader, CardBody, CardFooter, Divider } from './loader.style';

const PostLoader = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <div></div>
                    <span></span>
                </CardHeader>
                <CardBody>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </CardBody>
                <Divider />
                <CardFooter>
                    <div className="image"></div>
                    <div className="author"></div>
                </CardFooter>
            </Card>
        </>
    );
};

export default PostLoader;
