<? 
// AJAX add to cart.    
function add_one_product() {        
    ob_start();
    $product_id = apply_filters('woocommerce_add_to_cart_product_id', absint($_POST['product_id']));
    $quantity          = empty($_POST['quantity']) ? 1 : wc_stock_amount($_POST['quantity']);
    $passed_validation = apply_filters( 'woocommerce_add_to_cart_validation', true, $product_id, $quantity );
    $product_status    = get_post_status( $product_id );
    if ( $passed_validation && WC()->cart->add_to_cart( $product_id, $quantity ) && 'publish' === $product_status ) {
        do_action( 'woocommerce_ajax_added_to_cart', $product_id );
        wc_add_to_cart_message( $product_id );
        wp_send_json_success();
    } else {
        $data = array(
            'error'       => true,
            'product_url' => apply_filters( 'woocommerce_cart_redirect_after_error', get_permalink( $product_id ), $product_id )
        );
        wp_send_json( $data );
    }
    die();
}
add_action('wp_ajax_add_one_product', 'add_one_product');
add_action('wp_ajax_nopriv_add_one_product', 'add_one_product');

//Модификация woo rest api для product
function custom_api_product_response($data, $object){
    global $_wp_additional_image_sizes;
    unset($data->data['date_created']);
    unset($data->data['meta_data']);
    unset($data->data['description']);
    unset($data->data['price_html']);
    // unset($data->data['attributes']);
    unset($data->data['date_created_gmt']);
    unset($data->data['date_modified']);
    unset($data->data['date_modified_gmt']);
    unset($data->data['type']);
    unset($data->data['status']);
    unset($data->data['featured']);
    unset($data->data['catalog_visibility']);
    unset($data->data['short_description']);
    unset($data->data['sku']);
    unset($data->data['date_on_sale_from']);
    unset($data->data['date_on_sale_from_gmt']);
    unset($data->data['date_on_sale_to']);
    unset($data->data['date_on_sale_to_gmt']);
    unset($data->data['on_sale']);
    unset($data->data['purchasable']);
    unset($data->data['total_sales']);
    unset($data->data['virtual']);
    unset($data->data['downloadable']);
    unset($data->data['downloads']);
    unset($data->data['download_limit']);
    unset($data->data['download_expiry']);
    unset($data->data['external_url']);
    unset($data->data['button_text']);
    unset($data->data['tax_status']);
    unset($data->data['tax_class']);
    unset($data->data['manage_stock']);
    unset($data->data['stock_quantity']);
    unset($data->data['stock_status']);
    unset($data->data['backorders']);
    unset($data->data['backorders_allowed']);
    unset($data->data['backordered']);
    unset($data->data['sold_individually']);
    unset($data->data['weight']);
    unset($data->data['dimensions']);
    unset($data->data['shipping_required']);
    unset($data->data['shipping_taxable']);
    unset($data->data['shipping_class']);
    unset($data->data['shipping_class_id']);
    unset($data->data['reviews_allowed']);
    unset($data->data['average_rating']);
    unset($data->data['rating_count']);
    unset($data->data['related_ids']);
    unset($data->data['upsell_ids']);
    unset($data->data['cross_sell_ids']);
    unset($data->data['parent_id']);
    unset($data->data['purchase_note']);
    // unset($data->data['categories']);
    foreach ($data->data['images'] as $key => $image) {
        $image_urls = [];
        foreach ($_wp_additional_image_sizes as $size => $value) {
            $image_info = wp_get_attachment_image_src($image['id'], $size);
            $data->data['images'][$key][$size] = $image_info[0];
        }
    }
    return $data;
}
add_filter( 'woocommerce_rest_prepare_product_object', 'custom_api_product_response', 10, 2 );

//Получение продуктов
function getProducts(WP_REST_Request $request) {
    function roundArray($n){
        return round($n, 1);
    };
    if(isset ($_GET)){
        $current_search = $_GET['search'];
        $current_product_cat = $_GET['product-cat'];
        $current_items_order_by = $_GET['order_by'];
        $current_paged = $_GET['paged'];
        $include = $_GET['include'];
        
        $current_colors = $_GET['colors'] ? explode( ',', $_GET['colors']) : [];   
     
        $args = array(
            'post_status' => 'publish',
            'post_type' => array('product', 'product_variation'),
            'post_type' => 'product',
            'posts_per_page' => 16,  
            's' => $current_search,
            'paged' => ( $current_paged ? $current_paged : 1 ),
        );
        if($include){
            $args['post__in'] = explode( ',', $include);
        }
        $args['tax_query'] =  array('relation' => 'AND');
        $args['meta_query'] =  array('relation' => 'AND');

        if (isset($current_product_cat)  && !(empty($current_product_cat)) && !is_null($current_product_cat) && !($current_product_cat=="null")) {
            $request_params = array(
                'taxonomy' => 'product_cat',
                'field' => 'slug',
                'terms' => $current_product_cat
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($current_colors)  && !(empty($current_colors))) {
            $request_params = array(
                'taxonomy' => 'pa_colors',
                'field' => 'slug',
                'terms' => $current_colors,
            );
            array_push($args['tax_query'], $request_params); 
        }
   
        $result = new WP_Query($args);
        $products = [];
        function price_array($price){
            $del = array('<span class="woocommerce-Price-amount amount">', '<span class="woocommerce-Price-currencySymbol">' ,'</span>','<del>','<ins>', '&#8381;');
            $price = str_replace($del, '', $price);
            $price = str_replace('</del>', '|', $price);
            $price = str_replace('</ins>', '|', $price);
            $price_arr = explode('|', $price);
            $price_arr = array_filter($price_arr);
            return $price_arr;
        }
        foreach ($result->posts as $post) {
            $productInstance = new WC_Product($post->ID);
            $product = (object)[];
            $product->id = $post->ID;
            $product->slug = $post->post_name;
            $product->name = $post->post_title;
            $product->permalink = get_permalink($post->ID);
            $product->regular_price = $productInstance->get_regular_price();
            $product->sale_price = $productInstance->get_sale_price();
            $product->images = [];   
            //product_tag
            $terms_product_tag = get_the_terms( $post->ID, 'product_tag' );
            $term_array_product_tag = array();
            if ( ! empty( $terms_product_tag ) && ! is_wp_error( $terms_product_tag ) ){
                foreach ( $terms_product_tag as $term ) {
                    $term_array_product_tag[] = $term->name;
                }
            }
            $product->product_tags = $term_array_product_tag;
            $sizes_attributes = $productInstance->get_attribute( 'sizes' );
            $product->sizes_attributes = $sizes_attributes;
            $price_html = $productInstance->get_price_html();
            $product->price_html = price_array($price_html);
            global $_wp_additional_image_sizes;
            foreach ($_wp_additional_image_sizes as $size => $value) {
                $image_info = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), $size);
                $product->images[0][$size] = $image_info[0];
            }
            $product->acf = get_fields($post->ID);
            array_push($products, $product);
        }
        $response = (object)[];
        $response->posts = $products;
        $response->max_num_pages = $result->max_num_pages;
        $response->found_posts = $result->found_posts;
        $response->post_count = $result->post_count;
        $response->current_post = $result->current_post;
        wp_send_json_success( $response , 200 );
    }
    wp_send_json_error('Ошибка при получение значений продуктов');
}
add_action( 'rest_api_init', function () {
    register_rest_route( 'amadreh/v1/', '/get-products', array(
          'methods' => WP_REST_Server::READABLE,
          'callback' => 'getProducts',
      ) );
});

//установка количества продукта в корзине по cart id
function set_item_from_cart_by_cart_id() {
    $cart = WC()->instance()->cart;
    $cart_id = $_POST['cart_id'];
    $product_quantity = $_POST['product_quantity'];
    $cart_item_id = $cart->find_product_in_cart($cart_id);
    if($cart_item_id){
       $cart->set_quantity($cart_item_id, $product_quantity);
       $data = array(
            'subtotal'   => $cart->subtotal,
        );
       wp_send_json_success($data);
    } 
    wp_send_json_error();
}
add_action('wp_ajax_set_item_from_cart_by_cart_id', 'set_item_from_cart_by_cart_id');
add_action('wp_ajax_nopriv_set_item_from_cart_by_cart_id', 'set_item_from_cart_by_cart_id');